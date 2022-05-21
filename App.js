import { Amplify, Auth, API, graphqlOperation } from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppIntro from './src/pages/AppIntro';

import { withAuthenticator } from 'aws-amplify-react-native';
import { listTodos } from './src/graphql/queries';

class App extends React.Component {
  state = {
    todos: [],
    intro: true,
  };

  async getTodos() {
    try {
      const todoList = await API.graphql(graphqlOperation(listTodos));
      console.log('todo list:', todoList);
      this.setState({
        todos: todoList.data.listTodos.items,
      });
    } catch (error) {
      console.log('unable to fetch todo list...', error);
    }
  }

  async componentDidMount() {
    await this.getTodos();
  }

  view_main() {
    this.setState(() => {
      return { intro: false };
    });
  }

  signOut = () => {
    Auth.signOut()
      .then(() => this.props.onStateChange('signedOut'))
      .catch((err) => console.log('err: ', err));
  };
  render() {
    return this.state.intro ? (
      <AppIntro next={() => this.view_main()} />
    ) : (
      <SafeAreaView style={styles.container}>
        {this.state.todos.map((todo, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.name}>{todo.name}</Text>
            <Text style={styles.description}>{todo.description}</Text>
          </View>
        ))}
        <Text style={styles.title}>Main App</Text>
        <Text onPress={this.signOut}>Sign Out</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: { padding: 10 },
  name: { fontSize: 20 },
  description: { fontWeight: '600', marginTop: 4, color: 'rgba(0, 0, 0, .5)' },
  title: {
    fontSize: 28,
  },
});

export default withAuthenticator(App, {
  includeGreetings: false,
});
