from django.db import models
from django.contrib.auth.models import (BaseUserManager, AbstractBaseUser, PermissionsMixin)
 
class AditUserManager(BaseUserManager):
    def create_user(self, email, nickname, password=None, first_name, last_name, tags):
        if not email:
            raise ValueError('Users must have an email address')
        
        if AditUser.objects.get(email = email):
            raise ValueError('Email address should be unique')
 
        user = self.model(
            email = AditUser.normalize_email(email),
            nickname = nickname,
            first_name = first_name,
            last_name = last_name,
            tags = tags
        )
 
        user.set_password(password)
        user.save(using = self._db)
        return user
 
    def create_superuser(self, email, nickname, password):
        u = self.create_user(email = email,
                             nickname = nickname,
                             password = password,
                            )
        u.is_admin = True
        u.save(using = self._db)
        return u
 
class AditUser(AbstractBaseUser,  PermissionsMixin):
    email = models.EmailField(
        verbose_name = 'email',
        max_length = 255,
        unique = True,
    )
    nickname = models.CharField(
        'Nickname',
        max_length = 10, 
        blank = False, 
        unique = True, 
        default = ''
    )
    avatar = models.ImageField(
        null = True,
        blank = True,
        upload_to = 'image/avatar/',
    )
    first_name = models.CharField(
        'Firstname',
        max_length = 10, 
        blank = False, 
        unique = False, 
        default = ''
    )
    last_name = models.CharField(
        'Lastname',
        max_length = 10, 
        blank = False, 
        unique = False, 
        default = ''
    )
    tags = models.ManyToManyField(
        to = InterestedTags, 
        related_name = 'usertag'
    )
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
 
    objects = AditUserManager()
 
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', 'first_name', 'last_name']
 
    def get_full_name(self):
        # The user is identified by their email address
        return self.email
 
    def get_short_name(self):
        # The user is identified by their email address
        return self.email

    def get_nickname(self):
        return self.nickname

    def get_tags(self):
        return self.tags
 
    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin

    """ 
    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True
 
    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True
    """ 

class AdPost(models.Model):
    owner = models.ForeignKey(
        AditUser,
        related_name = 'post'
    )
    title = models.CharField(
        max_length = 64
    )
    subtitle = models.CharField(
        max_length = 64
    )
    content = models.TextField()
    thumbnail = models.ImageField(
        null = True,
        blank = True,
        upload_to = 'image/adpost/thumnail',
    )
    image = models.ManyToManyField(
        to = PostImage,
        related_name = 'imagepost'
    )
    ad_link = models.TextField()
    closed = models.BooleanField()
    target_views = models.IntegerField()
    total_views = models.IntegerField()
    upload_date = models.DateTimeField()
    expiry_date = models.DateField()
    tags = models.ManyToManyField(
        to = InterestedTags, 
        related_name = 'posttag'
    )

class PostImage(models.Model):
    image = models.ImageField(
        upload_to='image/adpost/postimage',
        null = True
    )
    post = models.ManyToManyField(
        to = AdPost,
        related_name = 'postimage',
        on_delete = models.CASCADE
    )

class InterestedTags(models.Model):
    content = models.CharField(
        max_length = 20
    )

class AdReception(models.Model):
    owner = models.ForeignKey(
        AditUser,
        related_name = 'adreception',
        on_delete = models.CASCADE
    )
    adpost = models.ForeignKey(
        AdPost,
        related_name = 'adreception',
        on_delete = models.CASCADE
    )
    views = models.IntegerField()
    unique_link = models.TextField()
    closed = models.BooleanField()

class Question(models.Model):
    owner = models.ForeignKey(
        AditUser,
        related_name = 'question',
        on_delete = models.CASCADE
    )
    adpost = models.ForeignKey(
        AdPost,
        related_name = 'question',
        on_delete = models.CASCADE
    )
    content = models.TextField()
    checked = models.BooleanField()