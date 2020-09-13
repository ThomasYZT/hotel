<template>
  <mainFrame :aside="false"
             :routerCom="false">
    <template slot="content">
      <div class="page-content">
        <div class="title-bar">
          <div class="title">UU智慧酒店管理系统</div>
        </div>
        <div class="auth-box">
          <div class="tab-wrapper">
            <Tabs value="login">
              <TabPane label="登 陆" name="login" :disabled="isLoading">
                <div class="login-box">
                  <i-form ref="loginForm"
                          :disabled="isLoading"
                          :model="loginFormData"
                          :rules="loginFormRule"
                          :label-width="60"
                          label-position="left">
                    <div class="form-item-wrapper">
                      <FormItem label="账号" prop="userName">
                        <i-input size="small" type="text" placeholder="用户名" maxlength="20" v-model="loginFormData.userName" />
                      </FormItem>
                      <FormItem label="密码" prop="password">
                        <i-input size="small" type="password" :password="true" placeholder="密码" v-model="loginFormData.password" />
                      </FormItem>
                    </div>
                    <div class="login-tool">
                      <el-checkbox :disabled="isLoading">记住密码</el-checkbox>
                      <span class="forgot">忘记密码?</span>
                    </div>
                  </i-form>
                  <i-button :loading="isLoading" type="primary" class="submit-btn"
                            @click="handleSubmit('loginForm')">登 陆</i-button>
                </div>
              </TabPane>
              <TabPane label="注 册" name="register" :disabled="isLoading">
                <div class="register-box">
                  <i-form ref="registForm"
                          :disabled="isLoading"
                          :model="registFormData"
                          :rules="registFormRule"
                          :label-width="60"
                          label-position="left">
                    <FormItem label="账号" prop="userName">
                      <i-input size="small" type="text" placeholder="用户名" maxlength="20" v-model="registFormData.userName" />
                    </FormItem>
                    <FormItem label="密码" prop="password">
                      <i-input size="small" type="password" :password="true" placeholder="密码" v-model="registFormData.password" />
                    </FormItem>
                  </i-form>
                  <i-button :loading="isLoading" type="primary" class="submit-btn"
                            @click="handleSubmit('registForm')">注 册</i-button>
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </template>
  </mainFrame>
</template>

<script>
import mainFrame from '../../components/Layout/mainFrame';
import ajax from '../../assets/api';
import { mapActions } from 'vuex';
export default {
  components : {
    mainFrame
  },
  data () {
    return {
      isLoading : false,
      loginFormData : {
        userName : '',
        password : ''
      },
      loginFormRule : {
        userName : [
          { required : true, message : '账户不能为空', trigger : 'blur' },
          { type : 'string', max : 20, message : '账户不能超过20个字', trigger : 'blur' }
        ],
        password : [
          { required : true, message : '密码不能为空', trigger : 'blur' }
        ]
      },
      registFormData : {
        userName : '',
        password : ''
      },
      registFormRule : {
        userName : [
          { required : true, message : '账户不能为空', trigger : 'blur' },
          { type : 'string', max : 20, message : '账户不能超过20个字', trigger : 'blur' }
        ],
        password : [
          { required : true, message : '密码不能为空', trigger : 'blur' }
        ]
      },
    };
  },
  /*created () {

    let getPermission = (data) => new Promise((resolve, reject) => {
      resolve(data);
      // reject('getPermissionError');
    });

    let generateRoute = (data) => new Promise((resolve, reject) => {
      resolve(data);
      // reject('generateRouteError');
    });

    let getOrgs = (data) => new Promise((resolve, reject) => {
      resolve(generateRoute(data));
      // reject('getOrgsError');
    });

    let login = () => new Promise((resolve, reject) => {
      resolve(getPermission(1));
      // reject('loginError');
    }).then(data => {
      return getOrgs(data);
    });

    login().then(data => {
      console.log(data, 'sucess');
    }).catch(err => {
      console.log(err, 'error');
    });
  },*/
  methods : {
    ...mapActions([
      'login',
    ]),
    handleSubmit (formName) {
      this.isLoading = true;
      // this.$router.push({
      //   name : 'menuList'
      // })
      this.formValidate(formName);
    },

    formValidate (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.formSubmit(formName);
        } else {
          this.isLoading = false;
        }
      });
    },
    formSubmit (formName) {
      if (formName === 'loginForm') {
        this.login({
          tip : false,
          ...this.loginFormData
        }).then(() => {
          this.$Message.success('登录成功');
        }).catch(({ err, type }) => {
          if (type === 'loginError') {
            this.$Message.error(`登录失败：${err.msg || JSON.stringify(err)}`);
          } else if (type === 'permissionError') {
            this.$Message.error(`获取权限失败：${err.msg || JSON.stringify(err)}`);
          }
        }).finally(() => {
          this.isLoading = false;
        });
      } else if (formName === 'registForm') {
        ajax.post('').then(res => {

        }).catch(() => {

        }).finally(() => {
          this.isLoading = false;
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "~@/assets/styles/scss/base";
@import "./styles/custom";
.page-content {
  @include flex_layout(column, center, center);
  height: 100%;
  width: 100%;
  background-image: url("../../assets/img/bg.png");
  background-size: 100% 100%;

  .title-bar {
    height: 62px;
    position: relative;
    .title {
      font-size: 33px;
      font-weight: normal;
      color: #FFFFFF;
      text-shadow: 1px 3px 0px #012813;
      -webkit-box-reflect: below -10px
        -webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0, 0)), color-stop(0.5, rgba(0,0,0, 0)), to(rgba(255,255,255, .4)));
    }
  }

  .auth-box {
    box-sizing: border-box;
    padding: 19px;
    margin-top: 30px;
    height: 279px;
    width: 229px;
    background-color: $color_fff;
    border-radius: 14px;
    box-shadow: 0 4px 24px 0 rgba(0,0,0,.1);

    .tab-wrapper {
      width: 100%;
      height: 100%;
      .login-box {
        position: relative;
        height: 100%;
        width: 100%;

        .login-tool {
          @include flex_layout(row, space-between, center);
          margin-bottom: 15px;
          font-size: $font-size-small;

          .forgot {
            cursor: pointer;
          }
        }
      }

      .register-box {
        position: relative;
        height: 100%;
        width: 100%;
      }

      .submit-btn {
        position: absolute;
        bottom: 20px;
        width: 100%;
        border-radius: unset;
      }
    }
  }
}
</style>
