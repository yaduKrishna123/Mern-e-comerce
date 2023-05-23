import React, { useEffect, useState } from 'react';
import Adminnav from './Adminnav';
import { PieChart, Pie, BarChart, Bar, Tooltip, Legend, Cell, XAxis, YAxis, LabelList } from 'recharts';
import './chart.css'
import { useNavigate } from 'react-router-dom';
import { getallpie } from '../../api/allapi';


function Admindashboard() {

  const [ele,setele]=useState(0)
  const [cloth,setcloth]=useState(0)

  const [foot,setfoot]=useState(0)

  const [beauty,setbeauty]=useState(0)

const getAllpie=async ()=>{

  try{
    const response=await getallpie()
    if(response.status===200){
      console.log(response.data['0']);
      setele(response.data['1'].count)
      setcloth(response.data['0'].count)
      setfoot(response.data['2'].count)
      setbeauty(response.data['3'].count)
      
    }


  }
  catch(error){
    console.log(error);
  }
}

const nav=useNavigate()
  useEffect(()=>{

    if(!localStorage.getItem("token")){
      alert('login required')
      nav('/')

  }
   getAllpie()


  })


  const pieChartData = [
    { name: 'elsectronics', value: ele },
    { name: 'clothing', value: cloth },
    { name: 'footeear', value: foot },
    { name: 'beauty products', value: beauty },
    
  ];

  const barGraphData = [
    { month: 'electronics', sales: ele },
    { month: 'clothing', sales: cloth },
    { month: 'footwear', sales: foot },
    { month: 'beautyproducts', sales: beauty },
  
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FFA07A'];

  const renderPieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${pieChartData[index].name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <>
      <Adminnav />

      <div className="dashboard">
        <h1>Dashboard</h1>

        <div className="pie-chart-container">
          <div className="chart">
            <h2>Pie Chart</h2>
            <PieChart width={600} height={600}>
              <Pie 
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={220}
                fill="#8884d8"
                labelLine={false}
                label={renderPieLabel}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="chart">
            <h2>Bar Graph</h2>
            <BarChart width={800} height={800} data={barGraphData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#0088FE">
                {barGraphData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                <LabelList dataKey="sales" position="top" />
              </Bar>
            </BarChart>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admindashboard;
