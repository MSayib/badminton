    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item :to="'/auth/secret'">Games</b-nav-item>

        <b-nav-item-dropdown text="User" right>
          <b-dropdown-item v-if="loggedIn" class="logout-link" @click="logout"
            >Logout</b-dropdown-item
          >
          <b-dropdown-item :to="'/auth/login'" v-else>Login</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>