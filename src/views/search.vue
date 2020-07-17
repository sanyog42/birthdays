<template>
    <v-container grid-list-md text-xs-center>
      <v-card elevation="10" color="secondary">
        <v-layout justify-center align-center>
          <v-flex xs5>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-combobox
                  v-model="dates"
                  multiple
                  chips
                  small-chips
                  label="Exact DOB"
                  prepend-icon="mdi-calendar"
                  readonly
                  clearable
                  v-on="on"
                ></v-combobox>
              </template>
              <v-date-picker
                ref="picker"
                v-model="dates"
                multiple
                no-title
                scrollable
                max="2005-01-01"
                min="1995-01-01"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">Close</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs5>
            <v-combobox
              v-model="select_years"
              :items="years"
              label="Year of Birth"
              multiple
              chips
              dense
            ></v-combobox>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout justify-center align-center>
          <v-flex xs7>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Name"
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
          <v-flex xs3>
            <v-text-field
              v-model="rol"
              type="number"
              append-icon="mdi-magnify"
              label="Roll No."
              single-line
              hide-details
            ></v-text-field>
          </v-flex>
        </v-layout>
        <br/>
      </v-card>
      <br/>
      <v-row justify="center">
        <v-data-table
          :headers="headers"
          :items="items"
        ></v-data-table>
      </v-row>
      <br/><br/><br/>
    </v-container>
</template>
<script>
import moment from 'moment';

export default {
  data: () => ({
    menu: false,
    dates: [],
    select_years: [],
    years: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004],
    search: '',
    rol: '',
    items: [],
  }),
  mounted () {
    window.scrollTo(0,0);
    this.$store.commit('nav', 1);
    var temp = this.$store.state.data;
    for (var x in temp){
      this.items.push({
        name: temp[x]['name'],
        dob: moment(temp[x]['dob']).format('DD-MM-YYYY'),
        roll: temp[x]['roll'],
        year: Number(new Date(temp[x]['dob']).getFullYear()),
      })
    }
  },
  computed: {
    headers () {
      return [
        {
          text: 'Name',
          align: 'start',
          value: 'name',
          filter: value => {
            if (this.search.length == 0) return true
            return value.toLowerCase().indexOf(this.search.toLowerCase()) > -1
          }
        },
        {
          text: 'Roll No.',
          value: 'roll',
          filter: value => {
            if (this.rol.length == 0) return true
            return String(value).toLowerCase().indexOf(this.rol.toLowerCase()) > -1
          }
        },
        {
          text: 'Year of Birth',
          value: 'year',
          filter: value => {
            if (this.select_years.length == 0) return true
            return this.select_years.includes(value)
          }
        },
        {
          text: 'Date of Birth',
          value: 'dob',
          sortable: false,
          filter: value => {
            if (this.dates.length == 0) return true
            return this.dates.includes(moment(value, 'DD-MM-YYYY').format('YYYY-MM-DD'))
          }
        },
      ]
    }
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
    },
    dates() {
      this.$refs.menu.save(this.dates)
    }
  }
};
</script>
<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}
</style>
