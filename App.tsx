/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from './src/colors';
import {scaleHorizontally, scaleVerticaly} from './src/utilities';
import firestore from '@react-native-firebase/firestore';

const App = () => {
  const [answerState, setAnswerState] = useState(0); // unanswered - 0, answered - 1, correctAnswer - 2, wrongAnswer - 3
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    firestore()
      .collection('questions')
      .doc('questionList')
      .get()
      .then((documentSnapshot: any) => {
        if (documentSnapshot.exists) {
          setQuestions(documentSnapshot.data().questions);
        }
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {questions.map((item: any, index: number) => {
        if (index === activeQuestion) {
          return (
            <View style={styles.innerContainer}>
              <View style={styles.statementContainer}>
                <Text style={styles.title}>Fill in the missing word</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                  {item.englishQuestion.split(' ').map((innerItem: any) => {
                    if (innerItem === item.englishAns) {
                      return <Text style={styles.engAns}>{innerItem} </Text>;
                    } else {
                      return <Text style={styles.engQues}>{innerItem} </Text>;
                    }
                  })}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                  }}>
                  {item.germanQuestion.split(' ').map((innerItem: any) => {
                    if (innerItem === item.germanAns) {
                      if (answerState === 0) {
                        return (
                          <View
                            style={{
                              width: scaleHorizontally(100),
                              height: 2,
                              backgroundColor: COLORS.white,
                              marginTop: scaleVerticaly(34),
                              marginHorizontal: scaleHorizontally(5),
                            }}></View>
                        );
                      } else if (answerState === 1) {
                        return (
                          <TouchableOpacity style={styles.optionInner}>
                            <Text style={styles.optionTxt}>
                              {selectedOption}
                            </Text>
                          </TouchableOpacity>
                        );
                      } else if (answerState === 2) {
                        return <View></View>;
                      } else if (answerState === 3) {
                        return <View></View>;
                      }
                    } else {
                      return <Text style={styles.gerQues}> {innerItem} </Text>;
                    }
                  })}
                </View>
              </View>
              <View style={styles.optionContainer}>
                {item.Options.map((optionItem: any, index: number) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedOption(optionItem);
                        setAnswerState(1);
                      }}
                      style={styles.optionInner}>
                      <Text style={styles.optionTxt}>{optionItem}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity
                  style={styles.noAnsBtn}
                  disabled={answerState === 0}
                  onPress={() => {
                    activeQuestion < questions.length - 1 &&
                      setActiveQuestion(activeQuestion + 1);
                  }}>
                  <Text style={styles.noAnsBtnTxt}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryTheme,
  },
  innerContainer: {
    flex: 1,
    width: '90%',
    height: '100%',
    alignSelf: 'center',
  },
  statementContainer: {
    flex: 2,
    alignItems: 'center',
  },
  optionContainer: {
    flex: 5,
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  optionInner: {
    backgroundColor: COLORS.white,
    paddingVertical: scaleHorizontally(15),
    paddingHorizontal: scaleHorizontally(20),
    margin: scaleHorizontally(10),
    alignItems: 'center',
    borderRadius: scaleHorizontally(20),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowColor: COLORS.black,
    elevation: 5,
  },
  optionTxt: {
    color: COLORS.primaryTheme,
    fontSize: scaleHorizontally(15),
    fontWeight: 'bold',
  },
  bottomContainer: {
    flex: 1,
    alignItems: 'center',
  },
  noAnsBtn: {
    width: '80%',
    backgroundColor: '#6D90A4',
    justifyContent: 'center',
    alignItems: 'center',
    height: scaleVerticaly(40),
    borderRadius: scaleVerticaly(20),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowColor: COLORS.black,
    elevation: 5,
  },
  noAnsBtnTxt: {
    color: COLORS.white,
    fontSize: scaleVerticaly(13),
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.white,
    fontSize: scaleHorizontally(12),
    marginTop: scaleVerticaly(10),
  },
  engQues: {
    color: COLORS.white,
    fontSize: scaleHorizontally(25),
    marginTop: scaleVerticaly(20),
  },
  engAns: {
    color: COLORS.white,
    fontSize: scaleHorizontally(25),
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: scaleVerticaly(20),
  },
  gerQues: {
    color: COLORS.white,
    fontSize: scaleHorizontally(20),
    marginTop: scaleVerticaly(20),
    textDecorationStyle: 'dotted',
  },
  gerAns: {
    color: COLORS.white,
    fontSize: scaleHorizontally(20),
    textDecorationLine: 'underline',
    marginTop: scaleVerticaly(20),
  },
});

export default App;
