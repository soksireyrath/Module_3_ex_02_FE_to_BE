<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-info" data-toggle="modal" data-target="#staticBackdrop">+</button>

    <!-- Modal -->
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
import apiService from "../services";
const _apiService = new apiService();
export default {
  name: "AddForm",
  data: () => ({
    task: "",
  }),
  methods: {
    onSubmit() {
      const post = {
        task: this.task,
      };
      console.log(post);
      _apiService
        .writeTask(post)
        .then((res) => {
          this.task = "";
          console.log(res)
          
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
</style>