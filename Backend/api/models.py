from django.db import models

# Create your models here.

class UploadedImage(models.Model):
    image=models.ImageField(upload_to='images/')
    uploaded_at=models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    product_name = models.CharField(max_length=255)
    product_image =models.ImageField(upload_to='product_images/')
    design_image = models.ImageField(upload_to='design_images/')
    custom_text = models.TextField(blank=True, null=True)
    quantity = models.PositiveIntegerField(default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order for {self.product_name} (x{self.quantity})"