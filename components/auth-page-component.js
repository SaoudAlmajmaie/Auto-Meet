export default {
  name: 'auth-page-component',
  props: {
    mode: {
      type: String,
      default: 'login',
    },
  },
  data() {
    return {
      form: {
        name: '',
        username: '',
        email: '',
        emailOrUsername: '',
        password: '',
        confirmPassword: '',
      },
      statusMessage: '',
      statusType: '',
    };
  },
  computed: {
    isLoginMode() {
      return this.mode === 'login';
    },
    isSignupMode() {
      return this.mode === 'signup';
    },
    pageHeading() {
      return this.isLoginMode ? 'Welcome back' : 'Create your account';
    },
    pageSubtitle() {
      return this.isLoginMode
        ? 'Log in to continue exploring AutoMeet.'
        : 'Start planning your next automotive outing.';
    },
    submitLabel() {
      return this.isLoginMode ? 'Login' : 'Sign Up';
    },
    switchText() {
      return this.isLoginMode ? 'Need an account?' : 'Already have an account?';
    },
    switchLinkText() {
      return this.isLoginMode ? 'Sign Up' : 'Login';
    },
    switchRoute() {
      return this.isLoginMode ? '/signup' : '/login';
    },
    statusClassName() {
      return this.statusType === 'error' ? 'auth-status-error' : 'auth-status-success';
    },
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault();

      if (this.isLoginMode) {
        if (!this.form.emailOrUsername.trim() || !this.form.password.trim()) {
          this.statusType = 'error';
          this.statusMessage = 'Please enter your email or username and password.';
          return;
        }

        this.statusType = 'success';
        this.statusMessage = 'Placeholder login: authentication is not connected yet.';
        return;
      }

      if (!this.form.name.trim() || !this.form.username.trim() || !this.form.email.trim() || !this.form.password.trim() || !this.form.confirmPassword.trim()) {
        this.statusType = 'error';
        this.statusMessage = 'Please complete every field before continuing.';
        return;
      }

      if (this.form.password !== this.form.confirmPassword) {
        this.statusType = 'error';
        this.statusMessage = 'Passwords do not match. Please re-enter them.';
        return;
      }

      this.statusType = 'success';
      this.statusMessage = 'Placeholder sign up: account creation is not connected yet.';
    },
  },
  template: /* html */ `
    <section class="auth-page">
      <div class="container auth-shell">
        <div class="auth-card auth-intro-card">
          <p class="eyebrow">AUTO MEET</p>
          <h1>{{ pageHeading }}</h1>
          <p>{{ pageSubtitle }}</p>
          <ul class="auth-feature-list" aria-label="AutoMeet benefits list">
            <li>Discover local car shows</li>
            <li>See event details in one place</li>
            <li>Plan your next meet-up</li>
          </ul>
        </div>

        <div class="auth-card auth-form-card">
          <div class="auth-header">
            <h2>{{ isLoginMode ? 'Login' : 'Sign Up' }}</h2>
          </div>

          <form @submit="handleSubmit" novalidate>
            <template v-if="isLoginMode">
              <div class="auth-field">
                <label for="login-identifier">Email or username</label>
                <input id="login-identifier" v-model="form.emailOrUsername" type="text" placeholder="Enter email or username" />
              </div>

              <div class="auth-field">
                <label for="login-password">Password</label>
                <input id="login-password" v-model="form.password" type="password" placeholder="Enter your password" />
              </div>
            </template>

            <template v-else>
              <div class="auth-field">
                <label for="signup-name">Name</label>
                <input id="signup-name" v-model="form.name" type="text" placeholder="Your full name" />
              </div>

              <div class="auth-field">
                <label for="signup-username">Username</label>
                <input id="signup-username" v-model="form.username" type="text" placeholder="Choose a username" />
              </div>

              <div class="auth-field">
                <label for="signup-email">Email</label>
                <input id="signup-email" v-model="form.email" type="email" placeholder="you@example.com" />
              </div>

              <div class="auth-field">
                <label for="signup-password">Password</label>
                <input id="signup-password" v-model="form.password" type="password" placeholder="Enter your password" />
              </div>

              <div class="auth-field">
                <label for="signup-confirm-password">Confirm password</label>
                <input id="signup-confirm-password" v-model="form.confirmPassword" type="password" placeholder="Confirm your password" />
              </div>
            </template>

            <button type="submit" class="btn btn-primary auth-submit-btn">
              {{ submitLabel }}
            </button>

            <p v-if="statusMessage" class="auth-status" :class="statusClassName">
              {{ statusMessage }}
            </p>
          </form>

          <p class="auth-switch">
            {{ switchText }}
            <router-link :to="switchRoute" class="auth-link">{{ switchLinkText }}</router-link>
          </p>
        </div>
      </div>
    </section>
  `,
};
