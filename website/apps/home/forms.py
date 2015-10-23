# -*- coding: utf-8 -*-
from django.contrib.auth import authenticate
from django import forms


error_messages = {
    'required': '不能为空',
}


class LoginForm(forms.Form):
    """
    登录处理form
    """
    username = forms.CharField(label='', min_length=2, max_length=50,
                               widget=forms.TextInput(attrs={'placeholder': '用户名', 'class': 'input-block-level'}),
                               error_messages=error_messages)
    password = forms.CharField(label='',
                               widget=forms.PasswordInput(attrs={'placeholder': '密码', 'class': 'input-block-level'}),
                               error_messages=error_messages)

    def __init__(self, *args, **kwargs):
        self.user_cache = None
        super(LoginForm, self).__init__(*args, **kwargs)

    def clean(self):
        username = self.cleaned_data.get('username')
        password = self.cleaned_data.get('password')

        if username and password:
            self.user_cache = authenticate(username=username, password=password)

            if self.user_cache is None:
                raise forms.ValidationError('用户名或密码错误')

        return self.cleaned_data

    def get_user_id(self):
        if self.user_cache:
            return self.user_cache.id
        return None

    def get_user(self):
        return self.user_cache


class SetPasswordForm(forms.Form):
    """
    重设密码
    """
    new_password1 = forms.CharField(label='新密码', min_length=6, max_length=32,
                                    widget=forms.PasswordInput(attrs={'placeholder':'新密码', 'class':'text'}), error_messages=error_messages)
    new_password2 = forms.CharField(label='确认新密码', min_length=6, max_length=32,
                                    widget=forms.PasswordInput(attrs={'placeholder':'确认新密码', 'class':'text'}), error_messages=error_messages)

    def __init__(self, user, *args, **kwargs):
        self.user = user
        super(SetPasswordForm, self).__init__(*args, **kwargs)

    def clean_new_password2(self):
        password1 = self.cleaned_data.get('new_password1')
        password2 = self.cleaned_data.get('new_password2')
        if password1 and password2:
            if password1 != password2:
                raise forms.ValidationError('与密码不一致')
        return password2

    def save(self, commit=True):
        self.user.set_password(self.cleaned_data['new_password1'])
        if commit:
            self.user.save()
        return self.user


class ChangePasswordForm(SetPasswordForm):
    old_password = forms.CharField(label='原密码', min_length=6, max_length=32,
                                   widget=forms.PasswordInput(attrs={'placeholder': '原密码','class': 'text'}),
                                   error_messages=error_messages)

    def clean_old_password(self):
        old_password = self.cleaned_data.get('old_password', '')
        if not self.user.check_password(old_password):
            raise forms.ValidationError('密码错误')

ChangePasswordForm.base_fields.keyOrder = ['old_password', 'new_password1',
                                           'new_password2']