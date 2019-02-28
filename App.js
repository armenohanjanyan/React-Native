import React from 'react';
import firebase from 'firebase';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  WebView,
  Keyboard,
  Modal,
  Alert
} from 'react-native';

export default class App extends React.Component {

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDjQ7blBmHP7xRpoxMhwPcZni1W5UP8nOk",
      authDomain: "native-ad1f1.firebaseapp.com",
      databaseURL: "https://native-ad1f1.firebaseio.com",
      projectId: "native-ad1f1",
      storageBucket: "native-ad1f1.appspot.com",
      messagingSenderId: "470821651171"
    };
    firebase.initializeApp(config);

    firebase.database().ref('comments').once('value', (data) => {
      let arr = Object.values(data.toJSON());
      this.setState({ comments: arr })
    });


  }

  state = {
    comments: [],
    comment: '',
    user: false,
    userName: '',
    modalVisible: 'visible'
  }

  addCommentText = (e) => {
    this.setState({
      comment: e.target.value
    })
  }

  addComment = () => {
    const { comments } = this.state;
    const { comment } = this.state;

    if (comment !== '') {
      this.setState({
        comments: comments.concat(comment),
        comment: ''
      })
      firebase.database().ref('comments/').set({
        ...comments,
      });
      Keyboard.dismiss()

    }
  }

  render() {
    const { comments } = this.state;
    const { comment } = this.state;

    let date = <Text style={{ textAlign: 'right', width: '100%', fontSize: 12, marginRight: 2 }}>{new Date().getHours() + ':' + new Date().getMinutes()}</Text>
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={{ height: 70, width: '100%', backgroundColor: 'rgb(27, 28, 32)', paddingTop: 20, paddingStart: 90 }}>
          <Text style={{ color: '#808080', fontSize: 40 }}>Auto Drive</Text>
        </View>
        <View style={{ height: 280, width: '100%', padding: 20 }}>
          <WebView
            source={{ uri: "https://player.twitch.tv/?channel=esl_sc2" }}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <ScrollView style={{ height: '100%', backgroundColor: '#DCDCDC', marginHorizontal: 20 }}>
          <View style={{ width: '100%', height: '100%' }}>
            {comments.map((el, i) => i % 2 === 0 ? (
              <View style={{ backgroundColor: '#808080', borderRadius: 15, padding: 10, width: '50%', marginTop: 6, marginLeft: 10 }} key={i}>
                <Text style={{ fontSize: 15 }}>{el}</Text>
              </View>
            ) : (
                <View style={{ backgroundColor: '#C0C0C0', borderRadius: 15, padding: 10, width: '50%', marginTop: 10, marginLeft: '30%' }}>
                  <Text style={{ fontSize: 15 }}>{el}</Text>
                </View>
              ))}
          </View >
          <Modal
            animationType="slide"
            transparent={true}
            style={{ backgroundColor: 'black', height: 100 }}
            visible={true}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'stretch',
              paddingHorizontal: 20,
            }}>
              <View style={{ height: 50, backgroundColor: 'skyblue' }} />
              <View style={{ height: 100, backgroundColor: 'steelblue' }} />
            </View>
          </Modal>
        </ScrollView>
        <View style={styles.inputContainer} >
          <TextInput
            onChangeText={(comment) => this.setState({ comment })}
            style={styles.input}
            value={comment}
            placeholder={this.state.user ? "leave your comment here..." : "write your nickname to join comments"}
          />
          <View style={{ width: '20%', backgroundColor: '#808080', height: 50, padding: 5 }}>
            <Button
              title="Send"
              color="black"
              onPress={() => this.addComment()}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgb(49, 50, 54)',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    bottom: 0,
    paddingHorizontal: 20
  },
  input: {
    width: '80%',
    borderWidth: 1,
    height: 50,
    backgroundColor: '#ffffff',
    borderColor: '#B4A8A8',
    paddingLeft: 15,
    paddingRight: 15,
  }
});
