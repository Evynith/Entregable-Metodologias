export default {
    data() {
      return {
        data: ''
      }
    },
    props: ['modelValue', 'type', 'accept'],
    emits: ['update:modelValue'],
    template: `
      <input type="file" :accept="accept" @change="cargarArchivo" class="form-control form-control-sm">
      <img v-if="type == 'img' && data" :src="data" class="img-fluid mt-2 mx-auto d-block">
      `,
    methods: {
      cargarArchivo(e) {
        const t = this // lo guardo ne una variable porque pierdo el contexto (event listeners y arrow functions)
        const file = e.target.files[0]  // dir de donde esta el archivo
        const reader = new FileReader()  // interpreta el archivo
        reader.readAsDataURL(file) 
        // reader.onload = (readerEvent) => t.src = readerEvent.target.result
        reader.onload = (readerEvent) => {
          const r = readerEvent.target.result
          t.data = r
          t.$emit('update:modelValue', r)
          // console.log(r)
        }
      }
    }
  }