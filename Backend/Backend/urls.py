"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from api.views import upload_image
from django.conf import settings
from django.conf.urls.static import static
from api.views import home
from api.views import create_order
from api.views import delete_order


urlpatterns = [
    path('admin/', admin.site.urls),
    path('',home, name='home'),
    path('upload/', upload_image, name='upload_image'),
    path('api/orders/', create_order, name='create_order'),
    path('api/orders/<int:order_id>/', delete_order, name='delete_order'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
