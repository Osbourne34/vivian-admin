import { Avatar, Grid, Group, NumberInput, Text } from '@mantine/core'

import { Product as ProductType } from '@/features/products'

import { useFormContext } from '../form-context'
import { DeleteProduct } from '../delete-product/delete-product'

import styles from './product.module.css'
import { PriceInput } from '@/shared/ui/price-input/price-input'

interface ProductProps extends ProductType {
  index: number
}

export const Product = (props: ProductProps) => {
  const { name, image, index } = props
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
            label={'Цена'}
            withAsterisk
            className={styles.input}
            {...form.getInputProps(`products.${index}.price`)}
          />
          <NumberInput
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
