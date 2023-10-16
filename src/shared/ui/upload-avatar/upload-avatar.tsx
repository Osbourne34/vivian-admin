import { useState, MouseEvent, useRef } from 'react'

import { ActionIcon, FileButton, Group, Text, Transition } from '@mantine/core'
import { IconCameraPlus, IconCameraMinus } from '@tabler/icons-react'

import classes from './upload-avatar.module.css'

interface UploadAvatarProps {
  name: string
  onChange: (file: File | null) => void
  error?: string
  value: File | null
  onFocus?: () => void
  onBlur?: () => void
  isUpdate?: boolean
}

export const UploadAvatar = (props: UploadAvatarProps) => {
  const { name, onChange, value, error, onBlur, onFocus, isUpdate } = props

  const [preview, setPreview] = useState<string | null>(null)
  const resetRef = useRef<() => void>(null)

  const handleChange = (file: File | null) => {
    onChange(file)
    const imageUrl = URL.createObjectURL(file!)
    setPreview(imageUrl)
  }

  const handleDelete = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    onChange(null)
    setPreview(null)
    resetRef.current?.()
  }

  const PreviewBlock = () => {
    const [show, setShow] = useState(false)

    return preview || value?.name ? (
      <div
        className={classes.preview}
        onMouseOver={() => setShow(true)}
        onMouseOut={() => setShow(false)}
      >
        <img className={classes.img} src={preview || value?.name} />
        <Transition mounted={show} transition={'fade'} duration={100}>
          {(styles) => (
            <>
              {isUpdate ? (
                <div className={classes.update}>
                  <IconCameraPlus size={30} />
                  <Text>Загрузить аватар</Text>
                </div>
              ) : (
                <ActionIcon
                  style={styles}
                  component="div"
                  onClick={handleDelete}
                  className={classes.delete}
                  size={'xl'}
                  variant="filled"
                  color="dark"
                >
                  <IconCameraMinus
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
            </>
          )}
        </Transition>
      </div>
    ) : null
  }

  return (
    <FileButton name={name} onChange={handleChange} resetRef={resetRef}>
      {(props) => (
        <Group justify="center">
          <button
            className={`${classes.root} ${error ? classes.error : ''}`}
            type="button"
            {...props}
          >
            {!(preview || value?.name) && (
              <div className={classes.idle}>
                <IconCameraPlus size={30} />
                <Text>Загрузить аватар</Text>
              </div>
            )}
            <PreviewBlock />
          </button>
          {error && <Text color="red">{error}</Text>}
        </Group>
      )}
    </FileButton>
  )
}
