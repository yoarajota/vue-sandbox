<script setup>
import { ref } from 'vue';
import Form from '../Form.vue';
import { listPush } from '../index'

const props = defineProps({
    config: {
        type: Object,
        required: true
    },
    trace: {
        type: [Array, null],
        default: null
    },
    LKey: {
        type: String,
        required: true
    }
})

const currentTrace = [...(props.trace ?? []), props.LKey]
const dialog = ref(false)

const save = () => {
  dialog.value = false;
  listPush(config.key)
}

</script>

<template>
    <div class="w-full">
        <!-- Toolbar -->
        <VToolbar
            color="white"
            flat
        >
          <VSpacer />
          <v-dialog
            v-model="dialog"
            persistent
            width="1024"
          >
          <template v-slot:activator="{ props }">
              <VBtn v-bind="props" icon="mdi-plus" />
          </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">User Profile</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <Form :trace="currentTrace" :config="config" />
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </VToolbar>

        <!-- List -->
        <VDataTable
            :headers="[]"
            :items="[]"
            :items-per-page="15"
            class="elevation-1"
        ></VDataTable>
    </div>
</template>