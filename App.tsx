import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CurrencyInput from 'react-native-currency-input';

/**
 *
 * @param param0
 * @returns
 */
const isEtanolWorth = ({
  etanolPrice,
  gasolinaPrice,
}: {
  etanolPrice: number;
  gasolinaPrice: number;
}) => {
  if (gasolinaPrice === 0) return false;
  return (etanolPrice * 100) / gasolinaPrice <= 70;
};

const realMask = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const realUnmask = (value: string) =>
  parseFloat(value.replace(/[^0-9,-]/g, '').replace(',', '.'));

export default function App() {
  const [gasolinaPrice, setGasolinaPrice] = useState<number>(0);
  const [etanolPrice, setEtanolPrice] = useState<number>(0);

  return (
    <View style={styles.container}>
      <View style={styles.visor}>
        {!gasolinaPrice || !etanolPrice ? (
          <Text>Preencha os Campos</Text>
        ) : (
          <Text>
            {isEtanolWorth({ etanolPrice, gasolinaPrice })
              ? 'Abasteça com Etanol'
              : 'Abasteça com Gasolina'}
          </Text>
        )}
      </View>
      <View>
        <View>
          <Text>Preço do Litro em Gasolina:</Text>
          <CurrencyInput
            value={gasolinaPrice}
            onChangeValue={v => setGasolinaPrice(v ?? 0)}
            prefix="R$ "
            minValue={0}
          />
        </View>
        <View>
          <Text>Preço do Litro em Etanol:</Text>
          <CurrencyInput
            value={etanolPrice}
            onChangeValue={v => setEtanolPrice(v ?? 0)}
            prefix="R$ "
            minValue={0}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-evenly',
    padding: 16,
  },
  visor: {
    alignItems: 'center',
  },
});
