import React, { Component } from 'react';
import Draggable from 'react-draggable';
class BattleArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
      rows: [0,1,2,3,4,5,6],
      cols: [0,1,2,3,4,5,6],
      shipSelected: false,
      selectable: false,
      selectedRow: null,
      selectedCol: null,
      horizontal: true,
      shipSize: 3,
      selectedCods: []     
    }
  }
  mouseOver = (e) => {
    const { horizontal,shipSize,rows,cols } = this.state;
    let selectedTabs ='';
    console.log(e.target.id)
    let val = (e.target.id).split('');
    this.setState({
      selectedRow: parseInt(val[0],10),
      selectedCol: parseInt(val[1],10)
    });
    if(horizontal) {
      if(parseInt(val[1],10) <= (cols.length-shipSize)){     
        this.setState({selectable: true});
      }else { 
        this.setState({selectable: false});
      }
    }else {
      if(parseInt(val[0],10) <= (rows.length-shipSize)){     
        this.setState({selectable: true});
      }else { 
        this.setState({selectable: false});
      }
    }
    
  }
  handleClick = (e) => {
    let val = parseInt(e.target.id, 10);
    let cods = [];
    const {horizontal, selectable, shipSize} =  this.state;
    if(horizontal && selectable) {
      for( let i=0 ; i < shipSize ; i++){
        cods.push(val+i);
      }
      
      console.log(val,val+1,val+2);
    }else if(selectable){
      for( let i=0 ; i < shipSize ; i++){
        cods.push(val+(i*10));
      }
    }
    this.setState({
        selectedCods: cods,
        shipSelected: true
    })
  }
  verticalSelection = (row) => {
    
    const {selectable, selectedRow, shipSize} = this.state;
    if (selectable && ( ( row >= selectedRow ) && ( row <= (selectedRow+(shipSize -1)) ) ) ){
        return 'shipSelected';
    }else if ( ( selectedRow  <= row ) && !selectable){
        return 'shipUnselected';
    }else {
        return '';
    }

  }
  horizontalSelection = (col) => {
    const {selectable, selectedCol, shipSize} = this.state;
    if (selectable && ( ( col >= selectedCol ) && ( col <= (selectedCol+(shipSize -1)) ) ) ){
        return 'shipSelected';
    }else if ( ( selectedCol  <= col ) && !selectable){
        return 'shipUnselected';
    }else {
        return '';
    }
  }
  cellDivs = (row) => {
    const {selectedRow, horizontal, selectedCol, shipSelected, shipSize, selectedCods} = this.state;
    let selectedTabs ='';
    
    if(row == selectedRow && horizontal && !shipSelected){
      return(
        this.state.cols.map((col,index) => {
          selectedTabs = this.horizontalSelection(col);
          return (
            <div className={`indent ${selectedTabs}`} id={`${row}${col}`} onMouseOver={this.mouseOver} key={`${row}${col}`} onClick={this.handleClick} ></div>
          )
        })
      ) 
      
    }
    else if(!horizontal && !shipSelected){
      return(
        this.state.cols.map((col,index) => {
          if(selectedCol == col){
            selectedTabs = this.verticalSelection(row);
          }else {
            selectedTabs="";
          }
          return (
            <div className={`indent ${selectedTabs}`} id={`${row}${col}`} onMouseOver={this.mouseOver} key={`${row}${col}`} onClick={this.handleClick} > </div>
          )
        })
      ) 
    }
   return(
      this.state.cols.map((col,index) => {
        let cord = `${row}${col}`;
        let tabs = '';
        for(let i=0; i< shipSize ; i++){
          if(cord == selectedCods[i]  ){
              tabs = 'shipSelected';            
          }
        }
        
        return (
          <div className={`indent ${tabs}`} id={`${row}${col}`} onMouseOver={this.mouseOver} key={`${row}${col}`} onClick={this.handleClick} > </div>
        )
      })
    ) 
  }
  cordReselected = () => {
    this.setState({
      shipSelected: false,
      selectedCods: []
    })
  }
  onShipSelect = () => {
    this.setState({
      horizontal: !this.state.horizontal
    })
  }   
  render() {
    const {rows ,shipSelected, selectable, selectedCods, horizontal} = this.state;
    let tabSelection = horizontal ? 'Horizontal' : 'Vertical';
    let shipColor =  shipSelected ? 'shipSelected' : 'shipUnselected';
    let selectedTabs ='';
    return (
      <div className="App">
      {
        rows.map((row,index) => {
          return(
            <div className={`row`} key={row}>
              {this.cellDivs(row)}
            </div>
          )
        })
      }

      <div className="button-block">
              <buttun className="player-submit">Next</buttun>
              <div onClick={this.cordReselected}>reselect</div>
              <div className={`ship ${shipColor}` } onClick={this.onShipSelect}>{tabSelection}</div>
      </div>
      
      </div>
    );
  } 
}
export default BattleArea; 

