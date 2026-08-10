<script setup lang="ts">
import { eachDayOfInterval, format, sub } from 'date-fns'
import { pt } from 'date-fns/locale'
import { VisXYContainer, VisLine, VisArea, VisAxis, VisCrosshair, VisTooltip } from '@unovis/vue'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')
const { width } = useElementSize(cardRef)

type RegistroDados = {
  date: Date
  amount: number
}

const intervalo = { start: sub(new Date(), { days: 29 }), end: new Date() }

const dados = ref<RegistroDados[]>(
  eachDayOfInterval(intervalo).map(date => ({
    date,
    amount: inteiroAleatorio(4_200_000, 9_800_000)
  }))
)

const x = (_: RegistroDados, i: number) => i
const y = (d: RegistroDados) => d.amount

const total = computed(() => dados.value.reduce((acc: number, { amount }) => acc + amount, 0))

const formatarData = (date: Date): string => format(date, 'd MMM', { locale: pt })

const ticksX = (i: number) => {
  if (i === 0 || i === dados.value.length - 1 || !dados.value[i]) {
    return ''
  }

  return formatarData(dados.value[i].date)
}

const template = (d: RegistroDados) => `${formatarData(d.date)}: ${formatarMoedaAOA(d.amount)}`
</script>

<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: 'px-0! pt-0! pb-3!' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Receita da plataforma · últimos 30 dias
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ formatarMoedaAOA(total) }}
        </p>
      </div>
    </template>

    <VisXYContainer
      :data="dados"
      :padding="{ top: 40 }"
      :margin="{ left: -5, right: -5 }"
      class="h-96"
      :width="width"
    >
      <VisLine :x="x" :y="y" color="var(--ui-primary)" />
      <VisArea
        :x="x"
        :y="y"
        color="var(--ui-primary)"
        :opacity="0.1"
      />
      <VisAxis type="x" :x="x" :tick-format="ticksX" />
      <VisCrosshair color="var(--ui-primary)" :template="template" />
      <VisTooltip />
    </VisXYContainer>
  </UCard>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: var(--ui-primary);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>
