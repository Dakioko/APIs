from .base import *
from decouple import config
import os

# Debug mode OFF for production
DEBUG = False

# Hosts allowed in production
ALLOWED_HOSTS = config(
    "SOPs_ALLOWED_HOSTS",
    default="yourdomain.com",
    cast=lambda v: [s.strip() for s in v.split(",")],
)

# CORS settings (restrict to frontend domain)
CORS_ALLOWED_ORIGINS = config(
    "SOPs_CORS_ALLOWED_ORIGINS",
    default="https://yourfrontend.com",
    cast=lambda v: [s.strip() for s in v.split(",")],
)
CORS_ALLOW_CREDENTIALS = True

# Real email backend (SMTP)
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = config("EMAIL_HOST", default="smtp.yourprovider.com")
EMAIL_PORT = config("EMAIL_PORT", default=587, cast=int)
EMAIL_USE_TLS = True
EMAIL_HOST_USER = config("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD")

# Directory to store logs
LOG_DIR = BASE_DIR / "logs"
os.makedirs(LOG_DIR, exist_ok=True)

# Only log ERROR and CRITICAL messages to a file
LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "file": {
            "level": "ERROR",
            "class": "logging.FileHandler",
            "filename": LOG_DIR / "django_errors.log",
        },
    },
    "root": {
        "handlers": ["file"],
        "level": "ERROR",
    },
    "loggers": {
        "django": {
            "handlers": ["file"],
            "level": "ERROR",
            "propagate": False,
        },
        "django.db.backends": {
            "handlers": ["file"],
            "level": "ERROR",
            "propagate": False,
        },
        "django.security": {
            "handlers": ["file"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}
