<template>
  <v-app id="inspire">
    <notifications position="top center"/>
    <v-overlay :value="$store.state.loading">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item-group v-model="$store.state.sel" color="warning">
        <v-list-item @click="$router.push({name: 'home'})" link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="$router.push({name: 'search'})" link>
          <v-list-item-action>
            <v-icon>mdi-account-search</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Birthday Search</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="warning"
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>BIRTHDAY EXPLORER</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-row justify="center">
      <v-alert
        style="width:90%;margin-bottom:8px"
        color="error"
        dark
        border="top"
        icon="mdi-information"
      >
        The database of this site contains date of births of 1st, 2nd, 3rd & 4th year B.Tech/B.S. students only. Database will soon be expanded.
      </v-alert>
      <v-btn color="warning" dark style="width:90%" @click="getData">Reload Data</v-btn>
    </v-row>
      <router-view/>
    </v-content>

    <v-footer
      dark
      padless
      fixed
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-title class="warning">
          <strong class="subheading">
            &copy; {{ new Date().getFullYear() }}
          </strong>

          <v-spacer></v-spacer>

          Made by: Sanyog Gupta
        </v-card-title>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';

  export default {
    props: {
      source: String,
    },
    data: () => ({
      data: [],
      drawer: null,
    }),
    methods: {
      getData: function () {
        this.$store.commit('load', true);
        axios.get('https://birthdays-5eb36.firebaseio.com/dob_data.json')
        .then(response => {
          var obj = null;
          for(var x in response.data){
            obj = {
              'roll': Number(x),
              'dob': moment(response.data[x]['DOB'], "DD-MM-YYYY").toDate(),
              'name': response.data[x]['Name']
            }
            this.data.push(obj)
          }
          this.$store.commit('load_data', this.data);
          this.$store.commit('load', false);
        })
        .catch(e => {
          this.$store.commit('load', false);
          this.$notify({type: 'error', title: 'Error', text: e.message})
        })
      }
    },
    mounted () {
      this.$vuetify.theme.dark = true;
      if(!this.$store.state.dataloaded) {
        this.getData()
      }
    },
  }
</script>
