<template>
    <div class="inner-block-home">
        <router-link to="/Logout" class="mb-4">Logout</router-link>
        <div class="home">
            <form class="form-inline" action="" @submit="searchByDate">
                <div class="row">
                    <div class="col-2 my-auto">
                        <label>Select date range:</label>
                    </div>
                    <div class="col-2">
                      <datepicker v-model="startDate" lang="en" :format="customFormatter" type="datetime"></datepicker>
                    </div>
                     <div class="col-2">
                      <datepicker v-model="endDate" lang="en" :format="customFormatter" type="datetime"></datepicker>
                    </div>
                    <div class="col-1" style="margin-top:50px;">
                        <button type="submit" class="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
           <p>{{ moment(startDate).format('YYYY-MM-DDTh:mm:ss') }}</p>
           <p>{{ moment(endDate).format('YYYY-MM-DDTh:mm:ss') }}</p>
            
            <EventTable @getPage="searchByDate" :records="eventData"/>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import EventTable from '@/components/EventTable.vue';
  //  import DatePicker from 'vue-time-date-range-picker/dist/vdprDatePicker';
  //import DatePicker from 'vue2-datepicker'
  // import 'vue2-datepicker/index.css';
  import Datepicker from 'vue-moment-datepicker';
   import moment from 'moment';

    export default {

        name: 'Home',
        data() {
            return {
                //date:'',
                //startDate: "2021-01-02T00:22:38.190Z",
                //endDate: "2021-01-02T00:34:59.819Z",
                startDate: this.startDate,
                endDate: this.endDate,
                eventData: []
            }
        },
        components: {
            Datepicker,
            EventTable,
        },
        mounted() {
            this.searchByDate();
        },

        methods: {
          moment: function (date) {
                return moment(date);
                },
                customFormatter (date) {
                return moment(date).format('YYYY-MM-DDTh:mm:ss');
                
            },
           
            searchByDate(event = null, page = 1) {
                console.log("I am here");
                if (event !== null) {
                    event.preventDefault();
                }
                const params = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    page: page,
                    limit: 10,
                }
                this.axios.get('GetByDateRange', {params}).then((response) => {
                     console.log(params);
                     console.log(response.data);
                    this.eventData = response.data;
                })
            }
          
        }
    }
</script>
<style>
    .vdpr-datepicker input {
        display: block;
        width: 100%;
        padding: .375rem .75rem;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: #212529;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: .25rem;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
    }
    .inner-block-home {
    width: 100%;
    margin:auto auto auto auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }
</style>
