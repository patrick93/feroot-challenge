<template>
  <div class="form-group-input">
    <label class="form-label">{{ label }}</label>
    <input
      v-bind="$attrs"
      class="form-control"
      :class="{ 'is-invalid': hasError }"
      :value="value"
      @input="onInputHandler"
    />
    <div v-if="errorMessage" class="invalid-feedback">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "FormGroupInput",
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    hasError: {
      type: Boolean,
      required: false
    },
    errorMessage: {
      type: String,
      required: false
    }
  },
  methods: {
    onInputHandler(event) {
      this.$emit("input", event.target.value);
    }
  }
}
</script>

<style>

</style>