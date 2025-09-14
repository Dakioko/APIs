from .base import *
from decouple import config

# Debug mode ON for development
DEBUG = True

# Hosts allowed in development
ALLOWED_HOSTS = config(
    "SOPs_ALLOWED_HOSTS",
    default="localhost,127.0.0.1",
    cast=lambda v: [s.strip() for s in v.split(",")],
)

# CORS settings (open for dev only)
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Email backend (prints emails to console in dev)
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Hide all logs except CRITICAL
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
        "level": "CRITICAL",
    },
    "loggers": {
        "django": {
            "handlers": ["console"],
            "level": "CRITICAL",
            "propagate": False,
        },
        "django.db.backends": {
            "handlers": ["console"],
            "level": "CRITICAL",
            "propagate": False,
        },
        "django.security": {
            "handlers": ["console"],
            "level": "CRITICAL",
            "propagate": False,
        },
    },
}
