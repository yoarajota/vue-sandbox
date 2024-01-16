<template>
    <VForm @submit.prevent="submit">
        <VTextField v-model="modelMessage" />

        <VBtn type="submit">
            submit
        </VBtn>
    </VForm>

    <div v-for="({ message, user }) of messages">
        {{ message }} - {{ user }}
    </div>
</template>

<script setup>
import { ref } from 'vue';
import supabase from '../../lib/supabase';
import { VBtn, VForm, VTextField } from 'vuetify/lib/components/index.mjs';

const modelMessage = ref('')

const messages = ref([])

const allChanges = supabase
  .channel('schema-db-changes')
  .on(
    'postgres_changes',
    {
      event: "INSERT",
      schema: 'public',
      table: 'messages'
    },
    (payload) => messages.value.push(payload.new)
  )
  .subscribe()


function submit() {
    supabase.from('messages').insert({
        message: modelMessage.value,
        user: 'jota'
    }).then(({ data, error }) => {
        modelMessage.value = ''
    }
    )
}

</script>