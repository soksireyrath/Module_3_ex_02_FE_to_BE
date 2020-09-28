<template>
  <div class="container">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Todo</b-navbar-brand>
      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#staticBackdrop">+</button>
    </b-navbar>

    <b-table striped hover :busy="isBusy" :items="tasks" :fields="fields" @row-dblclicked="(item) => deleteTask(item)">
      <template v-slot:table-busy>
        <div class="text-center text-danger my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>
    </b-table>

    <div
      class="modal fade"
      id="staticBackdrop"
      data-backdrop="static"
      data-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="onSubmit">
              <div class="form-group">
                <label for="task">Task</label>
                <input
                  v-model="task"
                  type="text"
                  class="form-control"
                  id="task"
                />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiServices from "../services";
const _apiServices = new apiServices();
export default {
  name: "Home",
  data: () => ({
    isBusy: true,
    tasks: [],
    task: "",
    fields: [
          {
            key: 'task',
            sortable: true,
          },
          {
            key: 'dateCreated',
            sortable: true,
            label: 'Date'
          }
    ]
  }),
  created() {
    this.getAllTask()
  },
  
  methods:{
    onSubmit() {
      const task = {
        task: this.task,
      };
      this.isBusy= true
      _apiServices
        .writeTask(task)
        .then(() => {
          this.task = "";
          this.getAllTask()
        })
        .catch((err) => console.log(err));
    },
    getAllTask(){
      _apiServices.getAllTask().then((res) => {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric',second:'numeric' };
      let t = res.data.map(function(x){
        var d = new Date(x.dateCreated)
        return {_id: x._id, task:x.task, dateCreated:d.toLocaleString("en-US", options)}
      })
      this.tasks = t;
      this.isBusy= false
    });
    },
    deleteTask(item){
      this.isBusy= true
      _apiServices
        .deleteTask(item._id)
        .then(() => {
          this.task = "";
          this.getAllTask()
        })
        .catch((err) => console.log(err));
    }
  }
};
</script>