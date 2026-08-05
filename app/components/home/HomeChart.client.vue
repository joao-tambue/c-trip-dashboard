<script setup lang="ts">
import { eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval, format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { Periodo, Intervalo } from '~/types'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

const props = defineProps<{
  periodo: Periodo
  intervalo: Intervalo
}>()

type RegistroDados = {
  date: Date
  amount: number
}

const { width } = useElementSize(cardRef)

const dados = ref<RegistroDados[]>([])

watch([() => props.periodo, () => props.intervalo], () => {
  const datas = ({
    diario: eachDayOfInterval,
    semanal: eachWeekOfInterval,
    mensal: eachMonthOfInterval
  } as Record<Periodo, typeof eachDayOfInterval>)[props.periodo](props.intervalo)

  const min = 1000
  const max = 10000

  dados.value = datas.map(d => ({ date: d, amount: Math.floor(Math.random() * (max - min + 1)) + min }))
}, { immediate: true })

const x = (_: RegistroDados, i: number) => i
const y = (d: RegistroDados) => d.amount

const total = computed(() => dados.value.reduce((acc: number, { amount }) => acc + amount, 0))

const formatarNumero = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format

const formatarData = (date: Date): string => {
  return ({
    diario: format(date, 'd MMM', { locale: ptBR }),
    semanal: format(date, 'd MMM', { locale: ptBR }),
    mensal: format(date, 'MMM yyy', { locale: ptBR })
  })[props.periodo]
}

const ticksX = (i: number) => {
  if (i === 0 || i === dados.value.length - 1 || !dados.value[i]) {
    return ''
  }

  return formatarData(dados.value[i].date)
}

const template = (d: RegistroDados) => `${formatarData(d.date)}: ${formatarNumero(d.amount)}`
</script>

<template>
  <UCard ref="cardRef" :ui="{ root: 'overflow-visible', body: 'px-0! pt-0! pb-3!' }">
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          Receita
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ formatarNumero(total) }}
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
      <VisLine
        :x="x"
        :y="y"
        color="var(--ui-primary)"
      />
      <VisArea
        :x="x"
        :y="y"
        color="var(--ui-primary)"
        :opacity="0.1"
      />

      <VisAxis
        type="x"
        :x="x"
        :tick-format="ticksX"
      />

      <VisCrosshair
        color="var(--ui-primary)"
        :template="template"
      />

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
