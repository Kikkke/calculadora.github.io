import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as math from 'mathjs';

export default function App() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const operators = ['+', '-', '*', '/', '^', 'sin(', 'cos(', 'tan(', 'log(', 'sqrt('];

  const handlePress = (value) => {
    // Limitar la longitud de la expresión a 9 dígitos
    const digitsOnly = expression.replace(/[^0-9]/g, ''); // Remover no dígitos
    if (digitsOnly.length >= 20) return; // Si ya hay 9 dígitos, no agregar más

    // Contar paréntesis
    const openParentheses = (expression.match(/\(/g) || []).length;
    const closeParentheses = (expression.match(/\)/g) || []).length;

    if (value === '(' && openParentheses >= 10) return; // Limitar a 10 paréntesis abiertos
    if (value === ')' && closeParentheses >= 10) return; // Limitar a 10 paréntesis cerrados
    if (value === ')' && closeParentheses >= openParentheses) return; // No permitir cerrar más paréntesis de los abiertos

    // Limitar a 5 puntos decimales
    if (value === '.' && (expression.match(/\./g) || []).length >= 5) return;

    // Verificar si el valor es un operador y si el último carácter también es un operador
    if (operators.includes(value)) {
      const lastChar = expression.charAt(expression.length - 1);
      // Evitar agregar operadores consecutivos
      if (operators.some(op => lastChar.includes(op))) return;

      // Contar cuántas funciones trigonométricas consecutivas hay
      const consecutiveTrigonometric = expression.match(/(sin|cos|tan|log|sqrt)\(/g) || [];
      if (consecutiveTrigonometric.length >= 6 && value.includes('(')) return; // Limitar a 2 funciones
    }

    setExpression((prev) => prev + value);
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleDelete = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    try {
      const evaluatedResult = math.evaluate(expression);
      if (!isFinite(evaluatedResult)) {
        throw new Error('No es un valor válido');
      }
      setResult(evaluatedResult.toString());
    } catch (error) {
      setResult('No es un valor válido');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.display}>
        <Text style={styles.expression}>{expression}</Text>
        <Text style={styles.result}>{result}</Text>
      </View>
      <View style={styles.buttons}>
        {/* Primera fila */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={handleClear}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <Text style={styles.buttonText}>⌫</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('(')}>
            <Text style={styles.buttonText}>(</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress(')')}>
            <Text style={styles.buttonText}>)</Text>
          </TouchableOpacity>
        </View>

        {/* Segunda fila */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('sin(')}>
            <Text style={styles.buttonText}>sin</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('cos(')}>
            <Text style={styles.buttonText}>cos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('tan(')}>
            <Text style={styles.buttonText}>tan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('/')}>
            <Text style={styles.buttonText}>÷</Text>
          </TouchableOpacity>
        </View>

        {/* Tercera fila */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('log(')}>
            <Text style={styles.buttonText}>log</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('sqrt(')}>
            <Text style={styles.buttonText}>√</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('^')}>
            <Text style={styles.buttonText}>^</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('*')}>
            <Text style={styles.buttonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Cuarta fila */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('7')}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('8')}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('9')}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('-')}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>

        {/* Quinta fila */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('4')}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('5')}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('6')}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('+')}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Sexta fila */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('1')}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('2')}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('3')}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCalculate}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>

        {/* Séptima fila */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('0')}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handlePress('.')}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco para todo
    justifyContent: 'center',
  },
  display: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#333', // Fondo gris oscuro para la pantalla
    padding: 20,
  },
  expression: {
    fontSize: 36,
    color: '#ffffff', // Texto blanco
  },
  result: {
    fontSize: 28,
    color: '#af3131', // Texto verde para el resultado
  },
  buttons: {
    flex: 2,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#666', // Botones gris oscuro
    justifyContent: 'center',
    alignItems: 'center',
    width: 55,
    height: 48,
    borderRadius: 30, // Hacer los botones circulares
    margin: 5,
  },
  buttonText: {
    fontSize: 24,
    color: '#fff', // Texto blanco
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
