import { useAppQuery, useAppSuspenseQuery } from '@/libs/react-query'
import { Role, RoleInput } from '@/types/models/role'
import LoadingContent from '../Loading/Content'
import { CFormCheck, CFormFloating, CFormInput, CFormLabel } from '@coreui/react'
import { useEffect } from 'react'
import { Permission } from '@/types/models/permission'
import { Form } from '@/types/form'
import { useTranslation } from 'react-i18next'

const RoleForm = ({
  id,
  enabled,
  viewing,
  form: {
    register,
    reset,
    setValue,
    getValues,
    formState: { errors },
  },
}: {} & Form<RoleInput>) => {
  const {t} = useTranslation()
  const { data: permissions } = useAppSuspenseQuery<Permission[]>({
    queryKey: ['permissions', 'form'],
    url: '/setting/permission',
    method: 'GET',
  })
  const { data: role, isFetching } = useAppQuery<Role>({
    queryKey: ['role', 'form', id],
    url: `/setting/role/${id}`,
    method: 'GET',
    enabled: !!id && enabled,
  })

  useEffect(() => {
    if (role) reset(role)
  }, [role, isFetching])

  const permission_register = register('permissions', {
    disabled: viewing,
    onChange: (e) => {
      const currentPermissions = getValues('permissions')
      const currentPermission = permissions.find((permission) => permission.name == e.target.value)

      if (!!currentPermission) {
        if (!currentPermission.name.includes('.')) {
          // parent permission
          permissions
            .filter((permission) => permission.name.includes(`${currentPermission!.name}.`))
            .forEach((permission) => {
              if (e.target.checked)
                setValue('permissions', [...getValues('permissions'), permission.name])
              else
                setValue(
                  'permissions',
                  getValues('permissions').filter(
                    (permissionID) => permissionID != permission.name,
                  ),
                )
            })
        } else {
          // child permission
          const parentPermissionName = currentPermission.name.split('.')[0]
          const permissionParent = permissions.find((permission) =>
            permission.name.includes(parentPermissionName),
          )!

          if (e.target.checked) {
            setValue(
              'permissions',
              currentPermissions.includes(permissionParent.name)
                ? currentPermissions
                : [...currentPermissions, permissionParent.name],
            )
          } else {
            let isAllChildUnchecked = true

            permissions
              .filter((permission) => permission.name.includes(`${parentPermissionName}.`))
              .every((permission) => {
                isAllChildUnchecked = currentPermissions.includes(permission.name)

                return !isAllChildUnchecked
              })

            if (!isAllChildUnchecked)
              setValue(
                'permissions',
                currentPermissions.filter((id) => id != permissionParent.name),
              )
          }
        }
      }
    },
  })

  if (isFetching) return <LoadingContent />

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
          {permissions
            .filter((permission) => !permission.name.includes('.'))
            .map((permissionParent) => {
              return (
                <>
                  <CFormCheck
                    className="py-1"
                    key={permissionParent.id}
                    inline
                    type="checkbox"
                    value={permissionParent.name}
                    label={<strong className="h-6">{permissionParent.name.toUpperCase()}</strong>}
                    {...permission_register}
                  />
                  <div key={`child_${permissionParent.id}`}>
                    {permissions
                      .filter((permission) => permission.name.includes(`${permissionParent.name}.`))
                      .map((permissionChild) => {
                        return (
                          <CFormCheck
                            key={permissionChild.id}
                            inline
                            type="checkbox"
                            value={permissionChild.name}
                            label={permissionChild.name
                              .replace(`${permissionParent.name}.`, '')
                              .toUpperCase()}
                            {...permission_register}
                          />
                        )
                      })}
                  </div>
                </>
              )
            })}
        </div>
      </div>
    </>
  )
}

export default RoleForm
