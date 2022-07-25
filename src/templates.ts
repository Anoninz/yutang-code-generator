import { UPPER_SNAKE_CASE, UPPER_SNAKE_CASE_COPY, UpperCammelCase } from './utils'

export function generateConstants(word: string) {
  const constant = `export const ${UPPER_SNAKE_CASE_COPY(word)} = {} as const`
  const typedKeys = `export const ${UPPER_SNAKE_CASE(word)}S = getTypedObjectKeys(${UPPER_SNAKE_CASE_COPY(word)})`
  const enumeration = `export const ${UPPER_SNAKE_CASE(word)} = enumeration('${UpperCammelCase(word)}', ${UPPER_SNAKE_CASE_COPY(word)})`
  const typeDefine = `export type ${UpperCammelCase(word)} = keyof typeof ${UPPER_SNAKE_CASE_COPY(word)}`
  return `
import { getTypedObjectKeys } from '~/libs/object'
import { enumeration } from '~/libs/mobx/types'

${constant}
${typedKeys}
${enumeration}
${typeDefine}
`
}

export function generateModel(modelName: string): string {
  const ModelName = UpperCammelCase(modelName)
  const ModelInstance = `${ModelName}Instance`
  const ModelSnapshotIn = `${ModelName}SnapshotIn`
  return `
import {
  types as t,
  flow,
  cast,
  Instance,
  SnapshotIn,
} from 'mobx-state-tree'

const ${ModelName} = t.model('${ModelName}', {
  id: t.identifier,
})

.views(_self => {
  const self = _self as ${ModelInstance}
  return {
    // some views
  }
})
.actions(self => ({
  // some actions
}))

export interface ${ModelInstance} extends Instance<typeof ${ModelName}> {}
export interface ${ModelSnapshotIn} extends SnapshotIn<typeof ${ModelName}> {}
`
}

export function generateCircularReferenceModel(modelName: string): string {
  const ModelName = UpperCammelCase(modelName)
  const ModelInstance = `${ModelName}Instance`
  const ModelSnapshotIn = `${ModelName}SnapshotIn`
  return `
import {
  types as t,
  flow,
  cast,
  Instance,
  IMaybe,
  IMaybeNull,
  IArrayType,
  IReferenceType,
  SnapshotIn,
} from 'mobx-state-tree'
import withTypedRefs, { RefineSnapshotIn } from '~/libs/mobx/withTypedRefs'

interface Refs {
  // foo: IMaybeType<IReferenceType<typeof FooModel>>
  // bars: IArrayType<IReferenceType<typeof BarModel>>
}

const ${ModelName} = withTypedRefs<Refs>()(
  t.model('${ModelName}', {
    // normal props:
    id: t.identifier,
    // circular references:
    // foo: t.maybe(t.reference(t.late((): any => FooModel))),
    // bars: t.array(t.reference(t.late((): any => BarModel))),
  })
)
.views(_self => {
  const self = _self as ${ModelInstance}
  return {
    // some views
  }
})
.actions(self => ({
  // some actions
}))

export interface ${ModelInstance} extends Instance<typeof ${ModelName}> {}
export interface ${ModelSnapshotIn}
  extends RefineSnapshotIn<typeof ${ModelName}, Refs> {}
`
}
