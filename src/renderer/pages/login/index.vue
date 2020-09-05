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
            <Tabs value="name1">
              <TabPane label="登 陆" name="name1">
                <div class="login-box">
                  <i-form ref="loginForm"
                          :model="loginFormData"
                          :rules="loginFormRule" :label-width="40" label-position="left">
                    <div class="form-item-wrapper">
                      <FormItem label="账号" prop="accountName">
                        <i-input size="small" type="text" placeholder="用户名" v-model="loginFormData.accountName" />
                      </FormItem>
                      <FormItem label="密码" prop="pwd">
                        <i-input size="small" type="password" :password="true" placeholder="密码" v-model="loginFormData.pwd" />
                      </FormItem>
                    </div>
                    <div class="login-tool">
                      <el-checkbox>记住密码</el-checkbox>
                      <span class="forgot">忘记密码?</span>
                    </div>
                    <i-button type="primary" class="submit-btn" @click="handleSubmit('loginForm')">登 陆</i-button>
                  </i-form>
                </div>
              </TabPane>
              <TabPane label="注 册" name="name2">
                <div class="register-box">
                  <i-form ref="registForm"
                          :model="registFormData"
                          :rules="registFormRule" :label-width="40" label-position="left">
                    <FormItem label="账号" prop="passwd">
                      <i-input size="small" type="text" placeholder="用户名" v-model="registFormData.accountName" />
                    </FormItem>
                    <FormItem label="密码" prop="passwdCheck">
                      <i-input size="small" type="password" :password="true" placeholder="密码" v-model="registFormData.pwd" />
                    </FormItem>
                    <i-button type="primary" class="submit-btn" @click="handleSubmit('registForm')">注 册</i-button>
                  </i-form>
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
export default {
  components : {
    mainFrame
  },
  data () {
    return {
      loginFormData : {
        accountName : '',
        pwd : ''
      },
      loginFormRule : {

      },
      registFormRule : {
        accountName : '',
        pwd : ''
      },
      registFormData : {

      }
    };
  },
  methods : {
    handleSubmit (formName) {

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
