from .base import *
from decouple import config

# Debug mode ON for development
DEBUG = config("DEBUG", default=True, cast=bool)

# Hosts allowed in development
ALLOWED_HOSTS = config(
    "ALLOWED_HOSTS",
    default="localhost,127.0.0.1",
    cast=lambda v: [s.strip() for s in v.split(",")],
)

# CORS settings (open for dev only)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Email backend (prints emails to console in dev)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Verbose logging for development
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "DEBUG",
    },
    "loggers": {
        # Show SQL queries in console
        "django.db.backends": {
            "handlers": ["console"],
            "level": "DEBUG",
        },
        # Show Django security warnings
        "django.security": {
            "handlers": ["console"],
            "level": "WARNING",
        },
    },
}
