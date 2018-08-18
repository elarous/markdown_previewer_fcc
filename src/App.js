import React, { Component } from 'react';
import marked from 'marked';

marked.setOptions({
  gfm: true,
  breaks: true
});

let renderer = new marked.Renderer();

renderer.link = function(href,title,text){
    return `<a target="_blank" href="${href}">${text}</a>`;
}


class Editor extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <textarea id="editor" value={this.props.value}
         onChange={this.props.handleChange}
         style={{height: "100%",
            width: "auto",
            padding: "10px",
            border: "none"  ,
            borderRadius: "10px",
            resize: "none",
            fontSize: "1.2rem",
            fontFamily: "Inconsolata",
            lineHeight: "1.6rem",
            color: "#37474f",
            backgroundColor: "#eceff1",
            outline: "none",
            boxShadow: "0px 0px 3px 1px #b0bec5",
          }} />
    );
  }
}

class Preview extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const html = marked(this.props.value, {renderer: renderer});
    console.log(html);
    return(
      <div id="preview" style={{height: "100%",
                   backgroundColor: "#fafafa",
                   boxShadow: "0px 0px 3px 1px #bdbdbd",
                   borderRadius: "10px",
                   padding: 10,
                   marginRight: "15px"}}
                   dangerouslySetInnerHTML={{__html: html}}>

      </div>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {value:
      "# This is a H1 header\n"
      +"## This is a H2 header\n"
      +"[Google](http://www.google.com/)\n"
      +"my inline  code `console.log('Hii');` is good\n"
      +"```clojure\n"
      +"(defn add [& args]\n"
      +"  (reduce + args)\n"
      +"```\n"
      +"+ item1\n+ item2\n\n"
      +"Oussama said : \n\n"
      +">Life is good my friend !\n\n"
      +">Never Give Up ;)\n"
      +"**This is bold  text**\n\n"
      +"![Google Logo](https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png)\n"
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({value : e.target.value});
  }

  render() {
    return (
      <div style={{backgroundColor: "#FFFFFF",
        height: "100vh",
        display: "grid",
        gridTemplateRows: "5% 90% 5%",
        fontFamily: "Roboto",
        fontWeight: "80"
      }}>
        <header style={
            {color: "#37474F",
             textAlign: "center",
             fontSize: "2rem",
            marginTop : "10px"}
          }>
          Markdown Previewer
        </header>
        <div style={{display: "grid",
                    margin: "0px",
                    padding: "15px",
                    gridTemplateColumns: "50% 50%",
                    gridColumnGap: "15px",
                    height: "auto"}}>
          <Editor value={this.state.value} handleChange={this.handleChange} />
          <Preview value={this.state.value} />
        </div>
        <footer style={{position: "fixed",
                        display: "flex",
                        justifyContent : "center",
                        width: "100%",
                        bottom: 0}}>
          <div style={{color: "#455a64"}}>
            By <a style={{textDecoration: "none",color: "#37474f"}}
             href="https://www.github.com/elarouss/">
            Oussama El Arbaoui</a> &copy; 2018
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
