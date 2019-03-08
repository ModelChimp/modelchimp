import os
from decouple import config

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


SECRET_KEY = config('SECRET_KEY', default='1')
MODEL_KEY = 'v9yPXW9JjTdprDBddlJAjwiEkP_DkoylN0oUTj4kID4='

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config('DEBUG', default=False, cast=bool)

ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*', cast=lambda v: [s.strip() for s in v.split(',')])
OAUTH_RESTRICT_USER_HOSTS = config('OAUTH_RESTRICT_USER_HOSTS', default='', cast=lambda v: [s.strip() for s in v.split(',')])


#Default auth model
AUTH_USER_MODEL = 'modelchimp.User'

#login url
LOGIN_URL = 'login'
LOGOUT_URL = 'logout'
LOGIN_REDIRECT_URL = 'home'
LOGOUT_REDIRECT_URL = '/'

# Application definition
INSTALLED_APPS = [
    'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.sites',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'compressor',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'storages',
    'rest_auth',
    'modelchimp',
]

SITE_ID = config('SITE_ID', default=1, cast=int)

# OAuth Configuration
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_VERIFICATION = "none"
SOCIALACCOUNT_QUERY_EMAIL = True

ENTERPRISE_FLAG =  config('ENTERPRISE_FLAG', default=True, cast=bool)

OAUTH_LOGIN=config('OAUTH_LOGIN', default=False, cast=bool) #DEPRECATED

MIDDLEWARE = (
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'htmlmin.middleware.HtmlMinifyMiddleware',
    'htmlmin.middleware.MarkRequestMiddleware',
)

AUTHENTICATION_BACKENDS = (
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
)

ROOT_URLCONF = 'settings.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': ['modelchimp/templates',],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'settings.wsgi.application'
ASGI_APPLICATION = 'settings.routing.application'

CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [(config('REDISHOST', default='redis'), 6379)],
        },
    },
}

# CELERY STUFF
BROKER_URL = 'redis://' + config('REDISHOST', default='redis') +  ':6379'
CELERY_RESULT_BACKEND = 'redis://' + config('REDISHOST', default='redis') +  ':6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME', default=''),
        'USER': config('DB_USER', default=''),
        'PASSWORD': config('DB_PASSWORD', default=''),
        'HOST': config('DB_HOST', default=''),
        'PORT': config('DBPORT', default=''),# Set to empty string for default.
    }
}

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# Media Root URL
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')
MEDIA_URL = '/media/'

# File upload size
CONTENT_TYPES = ['image',]
MAX_UPLOAD_SIZE = 2097152

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# Rest Configuration
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
    'TEST_REQUEST_DEFAULT_FORMAT': 'json'
}

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += (
    'rest_framework.renderers.BrowsableAPIRenderer',
)

# Minification Settings
STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    # other finders..
    'compressor.finders.CompressorFinder',
)

FIXTURE_DIRS = (
   os.path.join(BASE_DIR, 'fixtures'),
)

COMPRESS_ENABLED = DEBUG
COMPRESS_CSS_FILTERS = ["compressor.filters.cssmin.CSSMinFilter"]
COMPRESS_JS_FILTERS = ["compressor.filters.jsmin.JSMinFilter"]

HTML_MINIFY = config('COMPRESS_FLAG', default=True, cast=bool)

EXCLUDE_FROM_MINIFYING = ('^admin/', )

#################
#EMAIL
#################
EMAIL_USE_TLS = True
EMAIL_HOST = config('EMAIL_HOST', default='')
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
EMAIL_PORT = config('EMAIL_PORT', default='587', cast=int)
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='')

#################
#AMAZON S3 Credentials
#################
AWS_STORAGE_FLAG = config('AWS_STORAGE_FLAG', default=False, cast=bool)
if AWS_STORAGE_FLAG:
    AWS_ACCESS_KEY_ID = config('AWS_ACCESS_KEY_ID', default='')
    AWS_SECRET_ACCESS_KEY = config('AWS_SECRET_ACCESS_KEY', default='')
    AWS_STORAGE_BUCKET_NAME = config('AWS_STORAGE_BUCKET_NAME', default='')
    AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
    AWS_S3_OBJECT_PARAMETERS = {
        'CacheControl': 'max-age=86400',
    }
    DEFAULT_FILE_STORAGE = 'settings.storage_backends.S3MediaStorage'

AZURE_STORAGE_FLAG = config('AZURE_STORAGE_FLAG', default=False, cast=bool)
if AZURE_STORAGE_FLAG:
    AZURE_ACCOUNT_NAME = config('AZURE_ACCOUNT_NAME', default='')
    AZURE_ACCOUNT_KEY = config('AZURE_ACCOUNT_KEY', default='')
    AZURE_CONTAINER = config('AZURE_CONTAINER', default='')
    AZURE_SSL= True
    AZURE_URL_EXPIRATION_SECS = 1800
    DEFAULT_FILE_STORAGE = 'storages.backends.azure_storage.AzureStorage'

#################
#DEPRECATED
#################
if not OAUTH_RESTRICT_USER_HOSTS:
    OAUTH_RESTRICT_USER_HOSTS = config('ALLOWED_USER_HOSTS',
                                        default='',
                                        cast=lambda v: [s.strip() for s in v.split(',')])

#################
# CORS
#################

CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = ()
