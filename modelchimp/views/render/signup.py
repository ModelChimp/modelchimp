from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.conf import settings

from django.contrib.auth import login
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.contrib.auth.backends import ModelBackend

from modelchimp.forms.signup import SignupForm

from django.utils.encoding import force_text
from django.utils.http import urlsafe_base64_decode
from django.template.loader import render_to_string

from modelchimp.models.membership import Membership
from modelchimp.models.invitation import Invitation


def signup(request, invite_id=None):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.is_active = True
            user.save()

            #Add the membership to the project if its through an invite link
            if invite_id:
                iid = int(urlsafe_base64_decode(force_text(invite_id)))
                invite_obj = Invitation.objects.get(pk=iid)
                project = invite_obj.project
                Membership.objects.create(project=project, user=user)

            # Send Email
            if settings.EMAIL_HOST:
                mail_subject = 'Welcome to ModelChimp'
                html_message = render_to_string('email/welcome_email.html', {
                    'user': user,
                })
                text_message = strip_tags(html_message)
                to_email = user.email
                msg = EmailMultiAlternatives(mail_subject,
                                            text_message,
                                            from_email='Chimp <noreply@modelchimp.com>',
                                            to=[to_email])
                msg.attach_alternative(html_message, "text/html")
                msg.send()

            login(request,
                    user,
                    backend='django.contrib.auth.backends.ModelBackend')

            return HttpResponseRedirect('/project/')
    else:
        if invite_id:
            iid = int(urlsafe_base64_decode(force_text(invite_id)))
            invite_obj = Invitation.objects.get(pk=iid)
            form = SignupForm(initial={'email': invite_obj.to_email})
        else:
            form = SignupForm()


    return render(request, 'signup.html', {'form': form})


def special_invite(request, invite_name):
    form = SignupForm()

    return render(request, 'signup.html', {'form': form})
