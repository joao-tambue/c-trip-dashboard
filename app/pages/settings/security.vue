<script setup lang="ts">
import * as z from 'zod'
import type { FormError } from '@nuxt/ui'

const esquemaSenha = z.object({
  current: z.string().min(8, 'Deve ter pelo menos 8 caracteres'),
  new: z.string().min(8, 'Deve ter pelo menos 8 caracteres')
})

type EsquemaSenha = z.output<typeof esquemaSenha>

const senha = reactive<Partial<EsquemaSenha>>({
  current: '',
  new: ''
})

const validar = (state: Partial<EsquemaSenha>): FormError[] => {
  const erros: FormError[] = []
  if (state.current && state.new && state.current === state.new) {
    erros.push({ name: 'new', message: 'As senhas devem ser diferentes' })
  }
  return erros
}
</script>

<template>
  <UPageCard
    title="Senha"
    description="Confirme sua senha atual antes de definir uma nova."
    variant="subtle"
  >
    <UForm
      :schema="esquemaSenha"
      :state="senha"
      :validate="validar"
      class="flex flex-col gap-4 max-w-xs"
    >
      <UFormField name="current">
        <UInput
          v-model="senha.current"
          type="password"
          placeholder="Senha atual"
          class="w-full"
        />
      </UFormField>

      <UFormField name="new">
        <UInput
          v-model="senha.new"
          type="password"
          placeholder="Nova senha"
          class="w-full"
        />
      </UFormField>

      <UButton label="Atualizar" class="w-fit" type="submit" />
    </UForm>
  </UPageCard>

  <UPageCard
    title="Conta"
    description="Não quer mais usar nosso serviço? Você pode excluir sua conta aqui. Esta ação não é reversível. Todas as informações relacionadas a esta conta serão excluídas permanentemente."
    class="bg-linear-to-tl from-error/10 from-5% to-default"
  >
    <template #footer>
      <UButton label="Excluir conta" color="error" />
    </template>
  </UPageCard>
</template>
