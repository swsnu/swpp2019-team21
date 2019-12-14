from builtins import ValueError
from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin)

class AditUserManager(BaseUserManager):
    def create_user(self, email, nickname, first_name, last_name, tags, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        if AditUser.objects.filter(email=email).exists():
            raise ValueError('Email address should be unique')

        if AditUser.objects.filter(nickname=nickname).exists():
            raise ValueError('Nickname should be unique')

        user = self.model(
            email=AditUserManager.normalize_email(email),
            nickname=nickname,
            first_name=first_name,
            last_name=last_name,
            point=0
        )

        user.set_password(password)
        user.save(using=self._db)
        for tag in tags:
            user.tags.add(tag)
        user.save()
        return user

    def create_superuser(self, email, nickname, first_name, last_name, password):
        u = self.create_user(email=email,
                             nickname=nickname,
                             first_name=first_name,
                             last_name=last_name,
                             tags=[],
                             password=password,
                             )
        u.is_admin = True
        u.save(using=self._db)
        return u


class InterestedTags(models.Model):
    content = models.CharField(
        max_length=20
    )
    usercount = models.IntegerField()
    postcount = models.IntegerField()
    created_time = models.DateTimeField(auto_now_add = True)


class AditUser(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(
        verbose_name='email',
        max_length=255,
        unique=True,
    )
    nickname = models.CharField(
        'Nickname',
        max_length=10,
        blank=False,
        unique=True,
        default=''
    )
    avatar = models.ImageField(
        default = 'image/avatar/default_avatar.png',
        upload_to='image/avatar/',
    )
    first_name = models.CharField(
        'Firstname',
        max_length=10,
        blank=False,
        unique=False,
        default=''
    )
    last_name = models.CharField(
        'Lastname',
        max_length=10,
        blank=False,
        unique=False,
        default=''
    )
    point = models.IntegerField()
    tags = models.ManyToManyField(
        to=InterestedTags,
        related_name='touser'
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

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

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True


class PostImage(models.Model):
    image = models.ImageField(
        upload_to='image/adpost/postimage',
        null=True
    )


class AdPost(models.Model):
    owner = models.ForeignKey(
        AditUser,
        related_name='post',
        on_delete=models.CASCADE
    )
    title = models.CharField(
        max_length=64
    )
    subtitle = models.CharField(
        max_length=64
    )
    content = models.TextField()
    open_for_all = models.BooleanField(
        default=True
    )
    thumbnail = models.ForeignKey(
        PostImage,
        related_name='thumbnail_topost',
        on_delete=models.DO_NOTHING
    )
    image = models.ManyToManyField(
        PostImage,
        related_name='topost'
    )
    ad_link = models.TextField(blank=True)
    closed = models.BooleanField()
    target_views = models.IntegerField()
    total_views = models.IntegerField()
    upload_date = models.DateTimeField()
    expiry_date = models.DateField()
    view_by_date = models.TextField()
    tags = models.ManyToManyField(
        to=InterestedTags,
        related_name='topost'
    )


class SuggestPending(models.Model):
    post = models.ForeignKey(
        AdPost,
        related_name='tolist',
        on_delete=models.CASCADE
    )


class AdReception(models.Model):
    owner = models.ForeignKey(
        AditUser,
        related_name='toreception',
        on_delete=models.CASCADE
    )
    adpost = models.ForeignKey(
        AdPost,
        related_name='toreception',
        on_delete=models.CASCADE
    )
    views = models.IntegerField()
    unique_link = models.TextField()
    closed = models.BooleanField()
    recept_time = models.DateTimeField()

    def __str__(self):
        return self.unique_link


class Question(models.Model):
    owner = models.ForeignKey(
        AditUser,
        related_name='question',
        on_delete=models.CASCADE
    )
    adpost = models.ForeignKey(
        AdPost,
        related_name='question',
        on_delete=models.CASCADE
    )
    content = models.TextField()
    checked = models.BooleanField()


class VisitedIP(models.Model):
    ip_address = models.CharField(max_length=16)
    created = models.DateTimeField(auto_now_add=True)
    adreception = models.ForeignKey(
        AdReception,
        related_name='ip_visited',
        on_delete=models.CASCADE
    )