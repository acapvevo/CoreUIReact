import { RoleInput } from '@/types/models/role'
import LoadingContent from '../Loading/Content'
import { CFormInput, CFormLabel } from '@coreui/react'
import { useEffect } from 'react'
import { Form } from '@/types/form'
import { useTranslation } from 'react-i18next'
import { useFieldArray, useForm } from 'react-hook-form'
import { RoleFormControl } from '@/utils/form'
import { TreeViewComponent } from '@syncfusion/ej2-react-navigations'
import { getPermissions, getRole } from '@/utils/query'

const RoleForm = ({ id, enabled, viewing }: {} & Form<RoleInput>) => {
  const { data: permissions, isLoading: isPermissionsLoading } = getPermissions(enabled)
  const { data: role, isFetching } = getRole(id, enabled)
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    formControl: RoleFormControl,values: role
  })
  const { fields } = useFieldArray({
    control: RoleFormControl.control,
    name: 'permissions',
  })
  const { t } = useTranslation()

  if (!permissions || isPermissionsLoading || isFetching) return <LoadingContent />

  return (
    <>
      <div className="mb-3">
        <CFormLabel htmlFor="name_role">
          <strong>{t('name')}:</strong>
        </CFormLabel>
        <CFormInput
          type="text"
          id="name_role"
          placeholder="Name"
          invalid={!!errors.name}
          feedbackInvalid={errors.name?.message}
          {...register('name', { disabled: viewing })}
        />
      </div>
      <div className="mb-3">
        <CFormLabel htmlFor="permissions">
          <strong>{t('permissions')}</strong>
        </CFormLabel>
        <div id="permissions">
          <TreeViewComponent
            disabled={viewing}
            showCheckBox
            fields={{
              id: 'id',
              parentID: 'pid',
              text: 'name',
              hasChildren: 'hasChild',
              dataSource: permissions.map(({ id, name }) => {
                const [parent, child] = name.split('.')

                return !name.includes('.')
                  ? { id, name: parent.toUpperCase(), hasChild: true, expanded: true }
                  : {
                      id,
                      pid: permissions.find(({ name }) => name == parent)?.id ?? 1,
                      name: child.toUpperCase(),
                      isChecked: fields.some((field) => field.name == name),
                    }
              }),
            }}
            nodeChecked={(args) => {
              const permission = permissions.find((p) => p.id == args.data[0].id)
              if (!permission) return

              const isChecked = args.data[0].isChecked == 'true'
              let newPermissions = getValues('permissions')

              if (!permission.name.includes('.')) {
                newPermissions = isChecked
                  ? [
                      ...newPermissions,
                      ...permissions.filter((p) => p.name.startsWith(permission.name)),
                    ]
                  : newPermissions.filter((p) => !p.name.startsWith(permission.name))
              } else {
                const parentPermission = permissions.find(
                  (p) => p.name == permission.name.split('.')[0],
                ) ?? { name: '' }

                if (isChecked) {
                  if (!newPermissions.some((p) => p.name == parentPermission.name))
                    newPermissions = [...newPermissions, parentPermission]

                  newPermissions = [...newPermissions, permission]
                } else {
                  newPermissions = newPermissions.filter((p) => p.name != permission.name)

                  if (!newPermissions.some((p) => p.name.startsWith(`${parentPermission.name}.`)))
                    newPermissions = newPermissions.filter((p) => p.name !== parentPermission.name)
                }
              }

              setValue('permissions', newPermissions)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default RoleForm
