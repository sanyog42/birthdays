<template>
    <v-container fluid>
      <v-row justify="center">
        <v-card color="secondary">
          <v-card-title class="text-center justify-center py-6">
            <h1 class="font-weight-bold display-2">BIRTHDAYS</h1>
          </v-card-title>

          <v-tabs
            v-model="tab"
            background-color="transparent"
            color="warning"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item
              v-for="item in items"
              :key="item"
            >
              <v-card
                flat
              >
                <v-card-text>
                  <v-card>
                    <v-card-title>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                    </v-card-title>
                    <v-data-table
                      :headers="headers"
                      :items="(item == 'Yesterday')?yesterday:(item == 'Today')?today:tomorrow"
                      :search="search"
                    ></v-data-table>
                  </v-card>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-row>
      <br/><br/><br/>
    </v-container>
</template>
<script>
export default {
  data: () => ({
    tab: 1,
    items: [
      'Yesterday',
      'Today',
      'Tommorow'
    ],
    search: '',
    headers: [
      {
        text: 'Name',
        align: 'start',
        value: 'name',
      },
      { text: 'Roll No.', value: 'roll' },
      { text: 'Year Born in', value: 'year' },
    ],
  }),
  mounted () {
    window.scrollTo(0,0);
    this.$store.commit('nav', 0);
  },
  computed: {
    today () {
      var temp = this.$store.state.data;
      var temp1 = [];
      const d = new Date();
      const d_month = d.getMonth();
      const d_day = d.getDate();
      for (var x in temp) {
        if(new Date(temp[x]['dob']).getMonth() == d_month && new Date(temp[x]['dob']).getDate() == d_day){
          temp1.push({
            name: temp[x]['name'],
            year: new Date(temp[x]['dob']).getFullYear(),
            roll: temp[x]['roll']
          })
        }
      }
      return temp1
    },
    yesterday () {
      var temp = this.$store.state.data;
      var temp1 = [];
      const y = new Date(new Date().setDate(new Date().getDate() - 1));
      const y_month = y.getMonth();
      const y_day = y.getDate();
      for (var x in temp) {
        if(new Date(temp[x]['dob']).getMonth() == y_month && new Date(temp[x]['dob']).getDate() == y_day){
          temp1.push({
            name: temp[x]['name'],
            year: new Date(temp[x]['dob']).getFullYear(),
            roll: temp[x]['roll']
          })
        }
      }
      return temp1
    },
    tomorrow () {
      var temp = this.$store.state.data;
      var temp1 = [];
      const t = new Date(new Date().setDate(new Date().getDate() + 1));
      const t_month = t.getMonth();
      const t_day = t.getDate();
      for (var x in temp) {
        if(new Date(temp[x]['dob']).getMonth() == t_month && new Date(temp[x]['dob']).getDate() == t_day){
          temp1.push({
            name: temp[x]['name'],
            year: new Date(temp[x]['dob']).getFullYear(),
            roll: temp[x]['roll']
          })
        }
      }
      return temp1
    },
  }
};
</script>
<style>
</style>
