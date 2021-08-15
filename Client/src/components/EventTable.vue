<template>
    <div>
        <h3 class="mt-5">Events</h3>
        <hr class="mb-3">
        <table class="table">
            <thead>
            <tr>
                <th scope="col">Location</th>
                <th scope="col">Outcome</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, ind) in records.data" v-bind:key="ind">
                <td>{{item.location}}</td>
                <td>{{(item.outcome) ? 'True': 'False'}}</td>
                <td>{{item.timestamp|parseTimestamp}}</td>
                <td>
                    <button @click="getLocationById(item.location)" data-bs-toggle="modal"
                            data-bs-target="#exampleModal" class="btn btn-primary btn-sm">View
                        Details
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example" v-if="records.total_page">
            <ul class="pagination">
                <li class="page-item" :class="(records.current_page < 2) ? 'disabled' : ''">
                    <a @click="getByPage($event, records.current_page - 1)" class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item" v-for="(page, ind) in setPages" v-bind:key="ind"
                    :class="[(page.disabled) ? 'disabled' : '', (page.active) ? 'active' : '']">
                    <a @click="getByPage($event, page.label)" class="page-link" href="#"
                       :aria-disabled="(page.disabled) ? 'true' : 'false'">{{page.label}}</a>
                </li>
                <li class="page-item" :class="(records.current_page >= records.total_page) ? 'disabled' : ''">
                    <a @click="getByPage($event, records.current_page + 1)" class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>

        <!-- Modal -->
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Location ID: <b>{{detail.id}}</b> <br>
                        Location Name: <b>{{detail.name}}</b>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment';

    export default {
        name: "EventTable",
        data() {
            return {
                detail: {},
                pages: [],
            }
        },
        mounted() {

        },
        computed: {
            setPages() {
                let valPrev = this.records.current_page > 1 ? (this.records.current_page - 1) : 1 // for easier navigation - gives one previous page
                let valNext = this.records.current_page < parseInt(this.records.total_page) ? (this.records.current_page + 1) : parseInt(this.records.total_page) // one next page
                let extraPrev = valPrev === 3 ? 2 : null
                let extraNext = valNext === (parseInt(this.records.total_page) - 2) ? (parseInt(this.records.total_page) - 1) : null
                let dotsBefore = valPrev > 3 ? 2 : null
                let dotsAfter = valNext < (parseInt(this.records.total_page) - 2) ? (parseInt(this.records.total_page) - 1) : null
                let output = []
                for (let i = 1; i <= parseInt(this.records.total_page); i += 1) {
                    if ([1, parseInt(this.records.total_page), this.records.current_page, valPrev, valNext, extraPrev, extraNext, dotsBefore, dotsAfter].includes(i)) {
                        output.push({
                            label: i,
                            active: this.records.current_page === i,
                            disable: [dotsBefore, dotsAfter].includes(i)
                        })
                    }
                }
                return output
            },
        },
        props: ['records'],
        filters: {
            parseTimestamp(timestamp) {
                return moment(timestamp)
            }
        },
        methods: {
            getLocationById(id) {
                const params = {
                    id: id
                }
                this.$axios.get('GetLocationById', {params}).then(response => {
                    this.detail = response.data;
                })
            },
            getByPage(event, page) {
                this.$emit('getPage', event, page)
            },
        }

    }
</script>

<style scoped>

</style>
