<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <button v-if="user.isAuthenticated" class="btn btn-success my-5" type="button" data-bs-toggle="modal" data-bs-target="#project-form">
          Create Project
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">

</style>
