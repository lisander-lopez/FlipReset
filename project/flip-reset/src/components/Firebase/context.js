import React from 'react'

const FirebaseContext = React.createContext(null);

// This function is a template that takes in some component and its props, and 
// applies the firebase tools to it 
export const withFirebase = Component => props => (
    <FirebaseContext.Consumer>
      {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
);

export default FirebaseContext;