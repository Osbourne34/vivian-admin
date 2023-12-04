import { Avatar, Grid, Group, NumberInput, Text } from '@mantine/core'

import { useFormContext } from '../form-context'
import { DeleteProduct } from '../delete-product/delete-product'
import { ProductWithState } from '../../../types/individual-price'

import styles from './product.module.css'
import { PriceInput } from '@/shared/ui/price-input/price-input'

interface ProductProps extends ProductWithState {
  index: number
}

export const Product = (props: ProductProps) => {
  const { name, image, index, deleted } = props
  const form = useFormContext()

  return (
    <Grid align={'center'}>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <Group wrap="nowrap" justify={'space-between'}>
          <Avatar size={'lg'} radius={'sm'} src={image} alt={name} />
          <Text className={styles.name} size="sm" lineClamp={3}>
            {name}
          </Text>
          <DeleteProduct idx={index} hiddenFrom={'lg'} />
        </Group>
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <Group wrap={'nowrap'} align={'flex-start'}>
          <PriceInput
            disabled={deleted}
            label={'Цена'}
            withAsterisk
            className={styles.input}
            {...form.getInputProps(`products.${index}.price`)}
          />
          <NumberInput
            disabled={deleted}
            label="Поинт"
            withAsterisk
            className={styles.input}
            allowNegative={false}
            hideControls
            {...form.getInputProps(`products.${index}.point`)}
          />
          <DeleteProduct idx={index} visibleFrom={'lg'} mt={26} />
        </Group>
      </Grid.Col>
    </Grid>
  )
}
