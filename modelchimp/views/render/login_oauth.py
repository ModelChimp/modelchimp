from django.shortcuts import redirect
from modelchimp.views.render.base import BaseView


class LoginOAuthView(BaseView):
    template_name = "registration/login_oauth.html"

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect('home')

        return super(LoginOAuthView, self).dispatch(request,
                                                            *args,
                                                            **kwargs)
