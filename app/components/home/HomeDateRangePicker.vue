<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, CalendarDate, today } from '@internationalized/date'
import type { Intervalo } from '~/types'

const df = new DateFormatter('pt-BR', {
  dateStyle: 'medium'
})

const selecionado = defineModel<Intervalo>({ required: true })

const intervalos = [
  { label: 'Últimos 7 dias', days: 7 },
  { label: 'Últimos 14 dias', days: 14 },
  { label: 'Últimos 30 dias', days: 30 },
  { label: 'Últimos 3 meses', months: 3 },
  { label: 'Últimos 6 meses', months: 6 },
  { label: 'Último ano', years: 1 }
]

const paraDataCalendario = (date: Date) => {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}

const intervaloCalendario = computed({
  get: () => ({
    start: selecionado.value.start ? paraDataCalendario(selecionado.value.start) : undefined,
    end: selecionado.value.end ? paraDataCalendario(selecionado.value.end) : undefined
  }),
  set: (novoValor: { start: CalendarDate | null, end: CalendarDate | null }) => {
    selecionado.value = {
      start: novoValor.start ? novoValor.start.toDate(getLocalTimeZone()) : new Date(),
      end: novoValor.end ? novoValor.end.toDate(getLocalTimeZone()) : new Date()
    }
  }
})

const intervaloSelecionado = (intervalo: { days?: number, months?: number, years?: number }) => {
  if (!selecionado.value.start || !selecionado.value.end) return false

  const dataAtual = today(getLocalTimeZone())
  let dataInicio = dataAtual.copy()

  if (intervalo.days) {
    dataInicio = dataInicio.subtract({ days: intervalo.days })
  } else if (intervalo.months) {
    dataInicio = dataInicio.subtract({ months: intervalo.months })
  } else if (intervalo.years) {
    dataInicio = dataInicio.subtract({ years: intervalo.years })
  }

  const inicioSelecionado = paraDataCalendario(selecionado.value.start)
  const fimSelecionado = paraDataCalendario(selecionado.value.end)

  return inicioSelecionado.compare(dataInicio) === 0 && fimSelecionado.compare(dataAtual) === 0
}

const selecionarIntervalo = (intervalo: { days?: number, months?: number, years?: number }) => {
  const dataFim = today(getLocalTimeZone())
  let dataInicio = dataFim.copy()

  if (intervalo.days) {
    dataInicio = dataInicio.subtract({ days: intervalo.days })
  } else if (intervalo.months) {
    dataInicio = dataInicio.subtract({ months: intervalo.months })
  } else if (intervalo.years) {
    dataInicio = dataInicio.subtract({ years: intervalo.years })
  }

  selecionado.value = {
    start: dataInicio.toDate(getLocalTimeZone()),
    end: dataFim.toDate(getLocalTimeZone())
  }
}
</script>

<template>
  <UPopover :content="{ align: 'start' }" :modal="true">
    <UButton
      color="neutral"
      variant="ghost"
      icon="i-lucide-calendar"
      class="data-[state=open]:bg-elevated group"
    >
      <span class="truncate">
        <template v-if="selecionado.start">
          <template v-if="selecionado.end">
            {{ df.format(selecionado.start) }} - {{ df.format(selecionado.end) }}
          </template>
          <template v-else>
            {{ df.format(selecionado.start) }}
          </template>
        </template>
        <template v-else>
          Escolha uma data
        </template>
      </span>

      <template #trailing>
        <UIcon name="i-lucide-chevron-down" class="shrink-0 text-dimmed size-5 group-data-[state=open]:rotate-180 transition-transform duration-200" />
      </template>
    </UButton>

    <template #content>
      <div class="flex items-stretch sm:divide-x divide-default">
        <div class="hidden sm:flex flex-col justify-center">
          <UButton
            v-for="(intervalo, index) in intervalos"
            :key="index"
            :label="intervalo.label"
            color="neutral"
            variant="ghost"
            class="rounded-none px-4"
            :class="[intervaloSelecionado(intervalo) ? 'bg-elevated' : 'hover:bg-elevated/50']"
            truncate
            @click="selecionarIntervalo(intervalo)"
          />
        </div>

        <UCalendar
          v-model="intervaloCalendario"
          class="p-2"
          :number-of-months="2"
          range
        />
      </div>
    </template>
  </UPopover>
</template>
