import React,{useState,useMemo,useRef} from"react";
import{BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,Cell,PieChart,Pie,ScatterChart,Scatter,CartesianGrid,Legend}from"recharts";
import * as XLSX from 'xlsx';
const _TR={"Northeast":0,"Offshack":0,"Ohio Valley":0,"Southeast":0,"Sunbelt":0,"Hyperscaler":1,"Midwest":1,"North Central":1,"Pacific":1,"South Central":1,"Belgium Ent":2,"France Ent":2,"Germany Ent - Andre":2,"Germany Ent - Joerg":2,"Independent \u2013 Italy":2,"Italy Ent":2,"Netherlands Ent":2,"Nordics Ent":2,"Nordics New Business":2,"Spain Ent":2,"Switzerland Ent":2,"UK DW - Ent":2,"UK DW - Hospitality and Leisure":2,"UK DW - New Business":2,"UK DW - Premier":2,"EMEA IS Ent":3,"EMEA IS WS":3,"EU-APAC WS":4,"MEA WS":4,"UK WS":4,"Federal":5,"HiPo Accounts":6,"RSP-EM":6,"Strategic WS":6};
const _RG=["Enterprise - East","Enterprise - West","Europe Enterprise","Europe Inside Sales","Europe Wholesale","Government","Wholesale"];
const _TM=["Belgium Ent", "EMEA IS Ent", "EMEA IS WS", "EU-APAC WS", "Federal", "France Ent", "Germany Ent - Andre", "Germany Ent - Joerg", "HiPo Accounts", "Hyperscaler", "Independent \u2013 Italy", "Italy Ent", "MEA WS", "Midwest", "Netherlands Ent", "Nordics Ent", "Nordics New Business", "North Central", "Northeast", "Offshack", "Ohio Valley", "Pacific", "RSP-EM", "South Central", "Southeast", "Spain Ent", "Strategic WS", "Sunbelt", "Switzerland Ent", "UK DW - Ent", "UK DW - Hospitality and Leisure", "UK DW - New Business", "UK DW - Premier", "UK WS"];
const _D=[["James Cresswell-Smith",1,0,2,3,3,10544,86,289,43,304762,289,43,414,186,0,129,32,305,1,86,414,100],["Yanko Dimov",1,0,2,2,3,3814,18,100,15,49614,130,20,560,224,8,104,21,287,1,258,560,100],["Serge Remesch",1,0,2,28,3,11396,38,598,45,143248,126,19,372,149,0,236,47,260,1,178,372,100],["John Cullane",1,0,2,32,3,10808,87,262,39,237923,220,33,365,146,0,100,20,238,1,99,365,100],["Mattia Pagliara",1,0,2,32,3,8681,187,203,30,177703,205,31,342,137,0,94,19,217,1,100,343,100],["Ashley Katanik",0,0,1,22,3,3750,402,95,24,40096,107,27,431,129,0,104,21,200,1,242,431,100],["Nicholas Wilkins",1,1,2,31,3,10796,-11,64,10,126114,117,18,285,171,0,0,0,198,1,146,285,100],["Chris Sibley",1,0,2,33,3,10365,456,116,17,280041,270,41,220,99,0,97,24,181,1,49,220,100],["Amy Hale",1,0,1,22,3,7500,119,376,45,218851,292,44,139,63,0,110,28,179,1,29,139,100],["Nora El Messaoudi",1,0,2,14,3,8978,528,8,1,94194,105,16,348,139,0,106,21,177,1,199,348,86],["Christian Schwarze",1,0,2,6,3,8928,-25,11,2,63462,71,11,354,141,0,97,19,173,1,299,354,84],["Marian Peev",1,0,2,2,3,3714,1,196,29,71362,192,29,164,66,30,96,19,173,1,51,164,100],["Cyrille Brugi\u00e8re",0,1,2,5,3,4502,233,81,20,159635,355,75,241,72,0,0,0,167,1,41,241,100],["Treva Browning",0,0,1,27,3,7500,20,381,75,865762,1154,75,28,6,0,103,10,166,1,1,27,84],["Leo Rosen",0,0,1,8,3,14250,65,178,45,675426,474,75,82,25,0,107,21,166,1,10,82,100],["Fernando Medina",1,0,2,25,3,9001,963,1,0,101302,113,17,316,126,1,102,20,165,1,168,316,85],["Geoffrey McCowat",0,0,1,18,3,7500,167,214,54,188404,251,63,155,31,2,106,11,159,1,37,155,100],["James Kaufman",1,0,1,20,3,8000,115,522,45,464669,581,45,110,44,0,119,24,158,1,11,109,100],["Vinay Puni",1,0,2,33,3,10553,152,128,19,270773,257,38,150,68,0,100,25,150,1,35,150,100],["Kayla Yeachshein",1,0,1,4,3,52000,178,122,18,359229,69,10,247,99,0,113,23,150,1,215,247,100],["Jackilyn Lessman",1,0,1,20,3,12000,17,260,39,350229,292,44,103,41,3,109,22,149,1,21,103,100],["Joseph Southwell",1,0,1,8,3,14000,25,427,45,895484,640,45,68,31,0,98,24,145,1,6,68,100],["Andreea Moraru",1,0,1,26,3,15100,17,230,35,487276,323,45,86,39,0,104,26,144,1,16,86,100],["Abdul Taylor",1,0,1,22,3,16000,122,126,19,363660,227,34,146,66,0,102,26,144,1,39,146,100],["Aaron Nestor",0,0,1,18,3,8000,46,223,56,399806,500,75,21,4,0,82,8,143,1,3,22,84],["Nichole Hogan",0,0,1,27,3,6000,0,221,55,243421,406,75,2,0,2,105,10,143,1,0,2,72],["Ryan Hoey",1,0,1,18,3,25000,267,124,19,1112444,445,45,144,58,0,108,22,143,1,19,144,100],["Luigi Spinillo",1,0,2,10,3,8988,22,4,1,40501,45,7,274,110,0,101,20,137,1,365,274,80],["Ra\u00fal Mart\u00edn-Maestro",1,0,2,3,3,10841,39,277,41,287290,265,40,64,29,0,102,26,136,2,14,64,94],["Colin Jonkhout",1,0,2,14,3,9562,80,29,4,408888,428,45,159,63,0,112,22,135,2,22,159,100],["Melanie Young",1,0,1,23,3,10000,24,266,40,324794,325,45,41,16,12,109,22,135,2,8,41,84],["Anthony Romeo",1,0,1,24,3,12000,-3,337,45,865567,721,45,54,22,0,99,20,132,2,4,54,94],["Fionn Coffey",1,0,2,29,3,6365,135,189,28,142278,224,34,106,42,4,97,19,128,2,28,106,100],["Colette Fargher",0,0,2,3,3,5283,35,107,27,411890,780,75,29,9,0,82,16,127,2,2,29,74],["Adam Mikusch",1,0,1,23,3,8000,34,190,28,456609,571,45,48,19,14,97,19,126,2,5,48,93],["Paul Coleman",1,0,1,23,3,8000,75,158,24,474115,593,45,83,33,4,101,20,125,2,8,83,100],["Michael Cierebiej",1,0,1,20,3,18000,132,90,14,615003,342,45,112,45,0,110,22,125,2,20,112,100],["Brad Current",1,0,1,27,3,20000,44,256,38,1937093,969,45,53,21,0,102,20,125,2,3,53,92],["Lance Powell",1,0,1,27,3,18000,-27,92,14,239032,133,20,152,61,8,107,21,124,2,69,152,100],["Aaron Riche",1,0,1,23,3,15000,36,199,30,498514,332,45,29,12,17,97,19,123,2,5,29,79],["David Peeters",1,0,2,0,3,8851,439,15,2,108225,122,18,199,80,0,110,22,122,2,98,199,89],["Christopher Portelli",1,0,1,26,3,38050,141,87,13,335683,88,13,149,67,0,110,28,121,2,101,149,100],["Frank Lutterodt",1,0,2,15,3,11255,33,214,32,474143,421,45,51,20,0,112,22,120,2,7,51,94],["Jeff Kerstetter",1,0,1,26,3,28100,158,136,20,360200,128,19,122,55,0,99,25,119,2,57,122,100],["Jean-Baptiste Bourgeois",1,0,2,5,3,6746,136,148,22,65467,97,15,157,63,0,98,20,119,2,97,157,100],["Kevin Mathes",1,0,1,18,3,12000,21,129,19,154341,129,19,147,59,1,100,20,119,2,69,147,100],["Mark Dickinson",1,0,1,19,3,18000,92,30,4,489717,272,41,121,48,2,106,21,116,2,27,121,94],["David Zimmerman",1,0,1,8,3,14250,74,197,30,443442,311,45,36,16,0,99,25,116,2,7,36,81],["Matthew Sturm",1,0,1,20,3,10000,54,133,20,450427,450,45,47,19,10,103,21,114,2,6,46,90],["Maria Franky",1,0,1,22,3,13500,32,144,22,857917,635,45,52,23,0,94,24,114,2,5,52,93],["Bryan Weaver",1,0,1,8,3,14000,18,150,22,425140,304,45,42,19,0,102,26,112,2,8,42,84],["Yousuf Khan",1,0,1,21,3,25000,56,32,5,309501,124,19,159,63,0,120,24,111,2,77,158,93],["Helena Grade",1,0,2,28,3,9112,54,11,2,262248,288,43,115,46,0,100,20,111,2,24,115,85],["Sonja Johnson",1,0,1,21,3,12000,38,92,14,380602,317,45,47,19,12,100,20,109,2,9,47,72],["Tim J. Wood",1,0,2,29,3,6432,343,67,10,45543,71,11,141,56,14,90,18,108,2,119,140,95],["Pavel Banev",1,0,2,1,3,2723,25,457,45,48738,179,27,40,16,0,99,20,108,2,13,40,79],["Scott Scheinberg",1,0,1,21,3,15000,202,21,3,220272,147,22,128,51,7,116,23,107,2,52,128,87],["Remi Ruos",1,1,2,5,3,9004,-6,528,45,160911,179,27,58,35,0,0,0,106,3,19,58,91],["Joe Sage",1,0,1,21,3,12000,38,112,17,509681,425,45,65,26,0,91,18,106,3,9,65,91],["Christian Sekulla",1,0,2,7,3,9002,16,46,7,199585,222,33,104,41,0,117,23,105,3,28,104,91],["Simon Nielsen",1,1,2,16,3,9004,11,8,1,249655,277,42,103,62,0,0,0,104,3,22,103,78],["Scott Sanders",1,0,1,24,3,18000,17,114,17,1188006,660,45,40,16,6,97,19,104,3,4,40,80],["Michael Schrenk",1,0,1,18,3,12000,12,95,14,285979,238,36,85,34,0,100,20,104,3,21,85,92],["Cyndee Pustka",1,0,1,21,3,18000,83,73,11,172444,96,14,121,48,5,122,24,103,3,76,121,94],["David Griffiths",0,0,2,32,3,6129,25,32,8,195031,318,75,44,9,0,98,10,102,3,8,44,56],["Ian Newton",1,0,2,32,3,8310,49,15,2,256279,308,45,91,36,0,89,18,101,3,18,90,74],["Russell Wright",1,0,2,33,3,7997,87,139,21,161203,202,30,59,26,0,94,24,101,3,18,59,88],["Lovejoy Lee",1,0,1,22,3,12500,17,28,4,97521,78,12,127,57,0,110,28,101,3,98,127,83],["Ivan Penev",1,0,2,2,3,3686,44,75,11,15156,41,6,158,63,0,100,20,101,3,230,158,97],["Justin Svoboda",1,0,1,13,3,12000,13,127,19,246194,205,31,66,26,4,98,20,99,3,19,66,90],["Zak Kassi",1,0,2,32,3,8925,3,20,3,142533,160,24,137,55,0,83,17,98,3,52,137,90],["Eric Jones",1,0,1,20,3,16000,358,170,26,262935,164,25,76,30,0,85,17,98,3,28,76,100],["Olaf Schmitz",1,0,2,7,3,9004,481,50,8,84663,94,14,140,56,0,99,20,97,3,89,140,93],["Reynaldo Vincent",1,1,2,5,3,9004,0,324,45,118029,131,20,54,33,0,0,0,97,3,25,54,93],["Kirby Northey",1,0,1,13,3,8000,40,51,8,488939,611,45,47,19,4,106,21,96,3,5,47,68],["Rupert Hetherington",1,0,2,29,3,6398,22,159,24,91699,143,22,53,21,12,90,18,96,3,22,53,90],["Gustav Carlsson",1,0,2,15,3,10933,233,3,1,346730,317,45,77,31,0,96,19,96,3,15,77,65],["Chris Starsiak",1,1,1,9,3,10000,10,198,30,456826,457,45,30,18,3,0,0,96,3,4,30,87],["Alessandro Alfano",0,1,2,11,3,5814,1,609,75,42620,73,18,1,0,0,0,0,94,3,1,1,45],["Claudio Scalas",1,0,2,1,3,2803,31,50,8,68025,243,36,72,29,2,93,19,94,3,18,72,73],["James Storie",1,0,1,23,3,8000,6,100,15,169750,212,32,44,18,9,100,20,94,3,12,44,69],["Ivanina Staykova",1,0,2,6,3,6415,88,73,11,133811,209,31,81,32,0,92,18,93,3,23,81,85],["James Disney",1,0,2,29,3,6502,199,70,11,95948,148,22,78,31,10,97,19,93,3,32,78,87],["Philippe Brookes",1,1,2,31,3,10731,6,606,45,635058,592,45,4,3,0,0,0,93,3,0,4,77],["Boelie Vigeveno",1,0,2,14,3,9004,703,13,2,77244,86,13,149,59,0,90,18,92,3,104,149,85],["Khala Reisenbeck",1,0,1,20,3,8000,0,142,21,196682,246,37,25,10,3,100,20,91,3,6,25,70],["Russ Fritz",1,0,1,9,3,10000,54,132,20,529328,529,45,19,8,0,91,18,91,4,2,19,78],["Denis Mrejen",1,0,2,5,3,8997,13,25,4,213739,238,36,78,31,0,102,20,91,4,20,78,70],["Maarten Enkels",1,0,2,0,3,9004,10,37,6,41439,46,7,142,57,0,103,21,90,4,185,142,86],["Vladimir Doykinski",1,0,2,2,3,3964,31,109,16,48741,123,18,73,29,6,94,19,89,4,36,73,93],["Sarah Barton",1,0,2,33,3,10275,110,4,1,15388,15,2,137,62,0,93,23,88,4,550,137,74],["Maggie Ross",1,0,1,27,3,25000,52,61,9,277773,111,17,58,23,18,100,20,87,4,31,58,76],["Nicolas Romero",1,0,1,21,3,12000,1,48,7,203990,170,26,10,4,30,92,18,85,4,4,10,33],["Michael Hennig",1,1,2,7,3,6709,-3,262,39,531424,792,45,1,1,0,0,0,85,4,0,1,75],["Stefano Carrieri",1,1,2,11,3,7366,34,186,28,331375,450,45,18,11,0,0,0,83,4,2,17,82],["Aartie Nandpersad",1,0,2,3,3,21090,32,66,10,107464,51,8,86,39,0,105,26,83,4,102,86,80],["J\u00e9r\u00f4me Suquet",1,0,2,3,3,8343,24,54,8,129169,155,23,55,25,0,101,25,81,4,21,55,67],["Jason Kozowyk",1,0,1,4,3,15000,35,107,16,307450,205,31,28,11,2,104,21,81,4,8,28,61],["Samuel Burrows",1,0,2,29,3,6451,-5,91,14,139540,216,32,34,14,5,82,16,81,4,10,34,61],["Marcus D\u043e\u0435pfner",1,0,2,6,3,8967,126,109,16,170811,190,29,45,18,0,88,18,80,4,14,45,72],["Steve Lee",1,0,1,9,3,10000,66,44,7,372026,372,45,19,8,1,95,19,79,4,3,19,51],["Vinnie Pietrcollo",1,0,1,24,3,15000,11,89,13,219165,146,22,37,15,10,98,20,79,4,15,37,62],["Domenico Cara",1,0,2,11,3,8342,49,51,8,238610,286,43,17,7,1,92,18,77,4,4,17,45],["Sebastian Schulze",1,0,2,6,3,9003,0,10,1,10559,12,2,136,54,0,95,19,76,4,694,136,75],["Achim Schneeweis",1,1,2,7,3,10129,15,236,35,208252,206,31,16,10,0,0,0,76,4,5,16,64],["Craig Noakes",1,1,2,16,3,8604,125,63,9,896422,1042,45,35,21,0,0,0,76,4,2,35,64],["Carl Smith",1,1,2,31,3,10796,0,598,45,212394,197,30,0,0,0,0,0,75,4,0,0,54],["Konstantin Koukis",1,1,2,6,3,8904,151,68,10,206184,232,35,47,28,0,0,0,73,4,12,47,63],["Denislava Dobreva",0,0,2,1,3,2786,39,12,3,48200,173,43,61,12,5,83,8,72,4,21,61,59],["Scott Moerman",1,0,1,13,2,10000,16,43,6,103646,104,16,45,18,12,90,18,70,4,26,45,63],["Sean Stahl",1,0,1,17,2,15000,0,56,8,188382,126,19,54,21,0,97,19,68,4,26,54,70],["Eduardo Navarro Rodriguez",1,0,2,25,2,7878,2,90,14,74446,94,14,39,15,1,98,20,64,4,25,39,71],["Ross Fishburn",1,1,2,31,2,10478,4,35,5,217995,208,31,39,24,2,0,0,63,4,11,40,50],["Stefan Kanev",1,0,2,1,2,2752,22,19,3,9681,35,5,88,35,0,92,18,62,4,151,88,67],["Mark Simpson",1,0,2,33,2,8498,83,22,3,96248,113,17,41,18,0,92,23,62,4,22,41,52],["Joost Stolk",1,0,2,14,2,9004,32,0,0,179590,199,30,26,10,0,96,19,60,5,8,26,33],["Dimitar Mihaylov",1,0,2,7,2,8979,35,13,2,49180,55,8,65,26,0,91,18,54,5,71,65,62],["Hans Van Der Aa",1,0,2,0,2,8957,174,-79,-12,41067,46,7,94,38,0,98,20,52,5,124,94,45],["Andrea Negri",1,0,2,11,2,8441,17,18,3,143142,170,25,20,8,0,80,16,52,5,7,20,32],["Steve Williams",1,0,2,29,2,6478,29,12,2,36870,57,9,23,9,10,100,20,50,5,24,23,44],["Ryan Ortiz",0,1,1,22,2,7500,4,67,17,83612,111,28,4,1,0,0,0,46,5,2,4,29],["Andreas Kwaspen",1,1,2,0,2,8947,0,0,0,293313,328,45,0,0,0,0,0,45,5,0,0,27],["Colombe Julia-Plummer",1,0,2,33,2,8097,-7,7,1,73643,91,14,20,9,0,84,21,45,5,13,20,30],["Katy Velkeneers",1,0,2,0,2,8122,46,44,7,33622,41,6,26,10,0,105,21,44,5,37,26,58],["Ray Allieri",1,0,1,9,2,10000,14,15,2,37491,37,6,44,18,0,92,18,44,5,70,44,56],["Serbres Mooij",1,1,2,14,2,8988,2,0,0,252877,281,42,0,0,0,0,0,43,5,0,0,24],["Adam Kimbler",1,0,1,17,2,10000,104,0,0,0,0,0,35,14,10,87,17,41,5,0,0,9],["Ralph Szyska",1,1,2,6,2,9004,37,55,8,172739,192,29,6,4,0,127,0,41,5,2,6,34],["Heinz Kranner",1,0,2,6,2,9009,0,7,1,104694,116,17,11,4,0,81,16,39,5,6,11,21],["Elena Yaremchuk",1,1,2,16,2,4499,1,9,1,111857,249,37,0,0,0,0,0,39,5,0,0,23],["Joaquin Sialer",1,0,2,28,2,9056,46,0,0,0,0,0,36,14,0,96,19,33,5,0,0,9],["Raul Ruiz",0,1,2,25,2,4361,0,108,27,0,0,0,0,0,1,0,0,28,5,0,0,27],["Isidoro Leotta",1,1,2,25,2,8722,0,49,7,28778,33,5,1,1,14,0,0,27,5,2,1,18],["Anton Werr",1,0,2,6,1,8872,-1,3,0,15757,18,3,11,4,0,85,17,25,5,38,11,42],["Joey Raven",1,1,2,14,1,7415,0,16,2,80751,109,16,6,4,0,93,0,23,5,4,6,19],["Roland Ammann",0,1,2,28,1,9104,0,3,1,77083,85,21,0,0,0,0,0,22,5,0,0,8],["Jordan Jackson",0,1,2,30,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0],["Antoniya Nikolova",0,1,2,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,5,0,0,0],["Kenan Dogan Azak",0,1,2,12,0,0,0,0,0,8548,0,0,0,0,0,0,0,0,5,0,0,0],["Richard McLoughlin",0,1,2,29,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0],["J\u00fcrgen Lange",0,1,2,3,0,0,0,0,0,30597,0,0,0,0,0,0,0,0,5,0,0,0],["Lina Baronaite",1,0,2,7,0,0,0,0,0,0,0,0,48,0,0,111,0,0,5,0,0,12],["Jordan Cooper",0,1,2,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0]];
const decode=()=>_D.map(r=>{const mq=r[6]||1,cr=r[20],ef=r[10],fp=r[8],qs=r[13],fh=r[22],nf=r[21];
const cR=cr/100,n120=ef>0?Math.min(Math.round(ef*.67*cR/(mq*4)*1000)/10,999):0;
const n180=ef>0?Math.min(Math.round(ef*cR/(mq*6)*1000)/10,999):0;
const dc=mq>0&&cR>0?Math.round(ef*cR/(mq/30)):0;
let rk=0;if(fh<50)rk+=30;else if(fh<70)rk+=15;if(fp<50)rk+=20;else if(fp<100)rk+=10;
if(cr<10)rk+=20;else if(cr<20)rk+=10;if(qs<60)rk+=20;else if(qs<100)rk+=10;if(r[7]<50)rk+=10;rk=Math.min(rk,100);
return{n:r[0],t:r[1]?"Tenured":"Non-Tenured",h:r[2]?"Hunter":"",d:r[3]===1?"Americas":"Europe",
tm:_TM[r[4]],rg:_RG[_TR[_TM[r[4]]]||0],sr:r[5],mq,yq:r[7],fp,fs:r[9],ef,ep:r[11],es:r[12],qs,ls:r[14],
as2:r[15],tp:r[16],ts2:r[17],sc:r[18],qg:r[19],
cr,nf,fh,nf120:n120,nf180:n180,risk:rk,dcov:dc};});
const RAW=decode();
const parseExcel=(file)=>new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=e=>{try{
const wb=XLSX.read(e.target.result,{type:"array"});
const ws=wb.Sheets[wb.SheetNames.find(s=>s.includes("By Rep"))||wb.SheetNames[0]];
const rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:""});
let hdr=-1;for(let i=0;i<Math.min(rows.length,10);i++){if(rows[i]&&String(rows[i][0]).includes("Sales Rep")){hdr=i;break;}}
if(hdr<0){reject("Could not find header row with 'Sales Rep'");return;}
const h=rows[hdr],ci={};
const map={"Sales Rep":"n","Tenure":"t","Hunter for Scoring":"h","Division":"d","Sales Region":"rg","Sales Team":"tm","Score Range":"sr",
"YTD % Quota Sales Total":"yq","Current Month Quota":"mq","Funnel Adds %":"fp","Funnel Adds Score":"fs",
"180 Day Total Funnel":"ef","180 Day Funnel %":"ep","180 Day Score":"es","% Quota Sales Total":"qs",
"Last 12 months Quota Sales Total Score":"ls","Completed Activities YTD Score":"as2",
"% 2025 TBR Target Achievement":"tp","TBR Results Score":"ts2","Total Score":"sc",
"Quintile Global":"qg","Quintile Americas":"qa","Quintile Europe":"qe"};
h.forEach((v,i)=>{const s=String(v).trim();Object.entries(map).forEach(([k,f])=>{if(s.includes(k)||s===k)ci[f]=i;});});
if(!ci.n){reject("Missing 'Sales Rep' column");return;}
const reps=[];
for(let i=hdr+1;i<rows.length;i++){const r=rows[i];if(!r[ci.n]||!String(r[ci.n]).trim())continue;
const g=k=>{const v=ci[k]!==undefined?r[ci[k]]:0;return typeof v==="number"?v:parseFloat(v)||0;};
const gs=k=>{const v=ci[k]!==undefined?r[ci[k]]:"";return String(v).trim();};
let fp=g("fp"),yq=g("yq"),ep=g("ep"),qs=g("qs"),tp=g("tp");
if(fp!==0&&Math.abs(fp)<50)fp*=100;if(yq!==0&&Math.abs(yq)<50)yq*=100;
if(ep!==0&&Math.abs(ep)<50)ep*=100;if(qs!==0&&Math.abs(qs)<50)qs*=100;if(tp!==0&&Math.abs(tp)<10)tp*=100;
const ef=g("ef"),cr_mq=g("mq")||1,l12m=(qs/100)*cr_mq*12,pa=ef*2||1;
const cr=ef>0?Math.min(Math.round(l12m/pa*1000)/10,999):0;
const cR=cr/100,nf=ef>0?Math.min(Math.round(ef*.5*cR/(cr_mq*3)*1000)/10,999):0;
const fh_f=Math.min(fp/100,1.5)*25,fh_c=Math.min(ep/300,1.5)*25,fh_r=Math.min(cr/20,1.5)*25,fh_q=Math.min(qs/100,1.5)*25;
const fh=Math.min(Math.round((fh_f+fh_c+fh_r+fh_q)*10)/10,100);
const n120=ef>0?Math.min(Math.round(ef*.67*cR/(cr_mq*4)*1000)/10,999):0;
const n180=ef>0?Math.min(Math.round(ef*cR/(cr_mq*6)*1000)/10,999):0;
const dc=cr_mq>0&&cR>0?Math.round(ef*cR/(cr_mq/30)):0;
let rk=0;if(fh<50)rk+=30;else if(fh<70)rk+=15;if(fp<50)rk+=20;else if(fp<100)rk+=10;
if(cr<10)rk+=20;else if(cr<20)rk+=10;if(qs<60)rk+=20;else if(qs<100)rk+=10;if(yq<50)rk+=10;rk=Math.min(rk,100);
const sr_raw=gs("sr");const sr=sr_raw.includes("$0")?0:sr_raw.includes("70")?3:sr_raw.includes("25 -")?2:sr_raw.includes("below")?1:3;
const _tm=gs("tm");
reps.push({n:gs("n"),t:gs("t").includes("Ten")?"Tenured":"Non-Tenured",h:gs("h").includes("Hunt")?"Hunter":"",
d:gs("d").includes("Am")?"Americas":"Europe",tm:_tm,rg:gs("rg")||_RG[_TR[_tm]||0],sr,mq:Math.round(g("mq")),yq:Math.round(yq),
fp:Math.round(fp),fs:Math.round(g("fs")),ef:Math.round(ef),ep:Math.round(ep),es:Math.round(g("es")),
qs:Math.round(qs),ls:Math.round(g("ls")),as2:Math.round(g("as2")),tp:Math.round(tp),ts2:Math.round(g("ts2")),
sc:Math.round(g("sc")),qg:Math.round(g("qg"))||5,cr,nf,fh,nf120:n120,nf180:n180,risk:rk,dcov:dc});}
resolve(reps);}catch(err){reject(err.message);}};reader.onerror=()=>reject("File read error");reader.readAsArrayBuffer(file);});
const DARK={bg:"#0d0f14",bgS:"#13161e",cd:"#181c27",cH:"#1e2333",bd:"#252a3a",bL:"#2f3549",tx:"#e8e6e1",ts:"#a09d95",tm:"#6b6860",gl:"#d4a853",gD:"rgba(212,168,83,0.12)",tl:"#3dd6b5",tD:"rgba(61,214,181,0.12)",co:"#e8654a",cD:"rgba(232,101,74,0.12)",am:"#e8a838",aD:"rgba(232,168,56,0.12)",ic:"#5bb8e8",pl:"#b07cd4",pD:"rgba(176,124,212,0.12)"};
const LITE={bg:"#f4f1ec",bgS:"#e9e5de",cd:"#ffffff",cH:"#f7f5f1",bd:"#d9d4cb",bL:"#ccc6bc",tx:"#1c1a16",ts:"#5c5850",tm:"#8a857c",gl:"#b8892e",gD:"rgba(184,137,46,0.10)",tl:"#1aab8e",tD:"rgba(26,171,142,0.10)",co:"#d04a30",cD:"rgba(208,74,48,0.10)",am:"#c48a18",aD:"rgba(196,138,24,0.10)",ic:"#3a9fd4",pl:"#9460b8",pD:"rgba(148,96,184,0.10)"};
let T=DARK;
const qC=q=>q<=1?T.tl:q<=2?T.ic:q<=3?T.am:T.co;
const hC=s=>s>=70?T.tl:s>=50?T.am:s>=30?T.co:"#d44";
const hL=s=>s>=70?"Strong":s>=50?"Moderate":s>=30?"At Risk":"Critical";
const fxC=v=>v>=100?T.tl:v>=50?T.am:T.co;
const crC=v=>v>=20?T.tl:v>=10?T.am:T.co;
const riskC=v=>v>=50?T.co:v>=30?T.am:T.tl;
const Pill=({children,color,bg})=>(<span style={{display:"inline-block",padding:"2px 8px",borderRadius:20,fontSize:10,fontWeight:600,color:color||T.tx,background:bg||T.cH,letterSpacing:.4}}>{children}</span>);
const Stat=({label,value,sub,color,icon})=>(<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:"14px 16px",position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${color||T.gl}44,transparent)`}}/><div style={{fontSize:9,color:T.tm,textTransform:"uppercase",letterSpacing:1.5,fontWeight:700,marginBottom:5,fontFamily:"monospace"}}>{icon} {label}</div><div style={{fontSize:26,fontWeight:300,color:color||T.tx,fontFamily:"Georgia,serif",letterSpacing:-1}}>{value}</div>{sub&&<div style={{fontSize:10,color:T.ts,marginTop:3}}>{sub}</div>}</div>);
const Ring=({value,max,color,label,size=80})=>{const p=Math.min(value/max,1),r=(size-10)/2,c=2*Math.PI*r;return(<div style={{textAlign:"center"}}><svg width={size} height={size}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={T.bd} strokeWidth={3}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3} strokeDasharray={`${c*p} ${c*(1-p)}`} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}/><text x={size/2} y={size/2+1} textAnchor="middle" dominantBaseline="middle" fill={color} fontSize={size>70?15:11} fontWeight="300" fontFamily="Georgia,serif">{Math.round(value)}</text></svg>{label&&<div style={{fontSize:8,color:T.tm,marginTop:1,fontWeight:700,textTransform:"uppercase",letterSpacing:1}}>{label}</div>}</div>);};
const PB=({pct,color,h=4})=>(<div style={{width:"100%",height:h,background:T.bgS,borderRadius:h,overflow:"hidden"}}><div style={{width:`${Math.min(pct,100)}%`,height:"100%",background:color,borderRadius:h}}/></div>);
const SH=({children})=>(<div style={{fontSize:9,fontWeight:700,color:T.tm,textTransform:"uppercase",letterSpacing:1.5,fontFamily:"monospace",marginBottom:10}}>{children}</div>);
const TABS=["Overview","Teams","Rep Detail","Predictive Analytics","Methodology"];
export default function Dashboard(){
const[mode,setMode]=useState("dark");
T=mode==="dark"?DARK:LITE;
const tip={background:T.cd,border:`1px solid ${T.bL}`,borderRadius:10,color:T.tx,fontSize:11};
const[tab,setTab]=useState("Overview");
const[divF,setDivF]=useState("All");
const[tmF,setTmF]=useState("All");
const[sch,setSch]=useState("");
const[sel,setSel]=useState(null);
const[selRg,setSelRg]=useState(null);
const[selTm,setSelTm]=useState(null);
const[bS,setBS]=useState({});
const[pSo,setPSo]=useState("risk");
const[pFi,setPFi]=useState("All");
const[uploadedData,setUploadedData]=useState(null);
const[uploadMsg,setUploadMsg]=useState("");
const fileRef=useRef(null);
const SRC=uploadedData||RAW;
const handleUpload=async(e)=>{const f=e.target.files?.[0];if(!f)return;setUploadMsg("Processing\u2026");try{const reps=await parseExcel(f);setUploadedData(reps);setSel(null);setUploadMsg(`\u2713 Loaded ${reps.length} reps from ${f.name}`);setTimeout(()=>setUploadMsg(""),5000);}catch(err){setUploadMsg(`\u2717 ${err}`);setTimeout(()=>setUploadMsg(""),5000);}if(fileRef.current)fileRef.current.value="";};
const data=useMemo(()=>{let d=SRC.filter(r=>r.sr!==0);if(divF!=="All")d=d.filter(r=>r.d===divF);if(tmF!=="All")d=d.filter(r=>r.tm===tmF);if(sch)d=d.filter(r=>r.n.toLowerCase().includes(sch.toLowerCase()));return d;},[divF,tmF,sch,SRC]);
const tms=useMemo(()=>[...new Set(SRC.filter(r=>divF==="All"||r.d===divF).map(r=>r.tm))].sort(),[divF,SRC]);
const av=(a,k)=>a.length?(a.reduce((s,r)=>s+(typeof k==="function"?k(r):r[k]),0)/a.length):0;
const aS=av(data,"sc").toFixed(0),aFH=av(data,"fh").toFixed(0),aFp=av(data,r=>Math.min(r.fp,300)).toFixed(0),aCr=av(data,r=>Math.min(r.cr,100)).toFixed(0);
const b50=data.filter(r=>r.fh<50).length,q12=data.filter(r=>r.qg<=2).length;
const atR=useMemo(()=>data.filter(r=>r.fh<50||r.qg>=4).sort((a,b)=>a.fh-b.fh),[data]);
const hierarchy=useMemo(()=>{const divs={};data.forEach(r=>{if(!divs[r.d])divs[r.d]={name:r.d,reps:[],regions:{}};divs[r.d].reps.push(r);const rn=r.rg;if(!divs[r.d].regions[rn])divs[r.d].regions[rn]={name:rn,reps:[],teams:{}};divs[r.d].regions[rn].reps.push(r);if(!divs[r.d].regions[rn].teams[r.tm])divs[r.d].regions[rn].teams[r.tm]={name:r.tm,reps:[]};divs[r.d].regions[rn].teams[r.tm].reps.push(r);});return["Americas","Europe"].map(dn=>{const d=divs[dn];if(!d)return null;return{...d,regions:Object.values(d.regions).map(rg=>({...rg,teams:Object.values(rg.teams).sort((a,b)=>av(b.reps,"sc")-av(a.reps,"sc"))})).sort((a,b)=>av(b.reps,"sc")-av(a.reps,"sc"))};}).filter(Boolean);},[data]);
const qD=useMemo(()=>{const d=[0,0,0,0,0];data.forEach(r=>{if(r.qg>=1&&r.qg<=5)d[r.qg-1]++;});return[1,2,3,4,5].map((q,i)=>({name:`Tier ${q}`,value:d[i],fill:qC(q)}));},[data]);
const gB=n=>bS[n]||"Medium";const sB=(n,v)=>setBS(p=>({...p,[n]:v}));const bW=b=>b==="High"?5:b==="Medium"?3:1;
const ss={background:T.cd,color:T.tx,border:`1px solid ${T.bd}`,borderRadius:10,padding:"6px 12px",fontSize:11,outline:"none",cursor:"pointer",fontFamily:"inherit"};
return(
<div style={{background:T.bg,color:T.tx,minHeight:"100vh",fontFamily:"-apple-system,sans-serif",fontSize:13,backgroundImage:mode==="dark"?"radial-gradient(ellipse at 20% 0%,rgba(212,168,83,0.03),transparent 50%)":"none"}}>
<div style={{borderBottom:`1px solid ${T.bd}`,padding:"20px 24px 14px",background:`linear-gradient(180deg,${T.bgS},${T.bg})`}}>
<div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
<div><div style={{fontSize:9,color:T.gl,textTransform:"uppercase",letterSpacing:4,fontWeight:700,fontFamily:"monospace",marginBottom:3}}>Sales Intelligence</div>
<h1 style={{fontSize:24,fontWeight:300,margin:0,fontFamily:"Georgia,serif"}}>KPI Scorecard <span style={{color:T.gl}}>Dashboard</span></h1>
<div style={{fontSize:10,color:T.tm,marginTop:3,fontFamily:"monospace"}}>{uploadedData?<span style={{color:T.tl}}>\u25CF Uploaded data</span>:<span>As of 03/05/2026</span>} &middot; {data.length} Reps &middot; FY2026{uploadMsg&&<span style={{marginLeft:8,color:uploadMsg.includes("\u2713")?T.tl:T.co}}>{uploadMsg}</span>}</div></div>
<div style={{display:"flex",gap:6,flexWrap:"wrap",alignItems:"center"}}>
<select value={divF} onChange={e=>{setDivF(e.target.value);setTmF("All");}} style={ss}><option value="All">All Divisions</option><option value="Americas">Americas</option><option value="Europe">Europe</option></select>
<select value={tmF} onChange={e=>setTmF(e.target.value)} style={{...ss,maxWidth:170}}><option value="All">All Teams</option>{tms.map(t=><option key={t} value={t}>{t}</option>)}</select>
<input placeholder="Search\u2026" value={sch} onChange={e=>setSch(e.target.value)} style={{...ss,width:120,background:T.bgS}}/>
<button onClick={()=>setMode(m=>m==="dark"?"lite":"dark")} style={{background:mode==="dark"?"#2a2e3a":"#ddd7cd",border:`1px solid ${T.bd}`,borderRadius:20,padding:"5px 14px",fontSize:10,fontWeight:700,cursor:"pointer",color:mode==="dark"?"#e8e6e1":"#1c1a16",fontFamily:"monospace",display:"flex",alignItems:"center",gap:4}}>{mode==="dark"?"\u263E Dark":"\u2600 Lite"}</button>
<input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={handleUpload} style={{display:"none"}}/>
<button onClick={()=>fileRef.current?.click()} style={{background:uploadedData?T.tl+"22":mode==="dark"?"#2a2e3a":"#ddd7cd",border:`1px solid ${uploadedData?T.tl:T.bd}`,borderRadius:20,padding:"5px 14px",fontSize:10,fontWeight:700,cursor:"pointer",color:uploadedData?T.tl:mode==="dark"?"#e8e6e1":"#1c1a16",fontFamily:"monospace",display:"flex",alignItems:"center",gap:4}}>{uploadedData?"\u2713 Updated":"\u2191 Upload"}</button>
{uploadedData&&<button onClick={()=>{setUploadedData(null);setSel(null);setUploadMsg("Reverted to default");setTimeout(()=>setUploadMsg(""),3000);}} style={{background:"transparent",border:`1px solid ${T.bd}`,borderRadius:20,padding:"5px 10px",fontSize:9,cursor:"pointer",color:T.tm,fontFamily:"monospace"}}>Reset</button>}
</div></div>
<div style={{display:"flex",gap:2,marginTop:14}}>{TABS.map(t=>(<button key={t} onClick={()=>setTab(t)} style={{background:tab===t?T.gl:"transparent",color:tab===t?T.bg:T.tm,border:"none",borderRadius:8,padding:"6px 14px",fontSize:10,fontWeight:700,cursor:"pointer",letterSpacing:.5,textTransform:"uppercase",fontFamily:"monospace"}}>{t}</button>))}</div></div>
<div style={{padding:"18px 24px",maxWidth:1400,margin:"0 auto"}}>
{tab==="Overview"&&(<>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10,marginBottom:18}}>
<Stat icon="" label="Avg Score" value={aS} sub="Composite" color={Number(aS)>100?T.tl:T.am}/>
<Stat icon="\u25C9" label="Funnel Health" value={`${aFH}%`} sub="Composite index" color={hC(Number(aFH))}/>
<Stat icon="\u25CA" label="Funnel Adds" value={`${aFp}%`} sub="vs 5x quota" color={fxC(Number(aFp))}/>
<Stat icon="\u25CB" label="Close Rate" value={`${aCr}%`} sub="Derived" color={crC(Number(aCr))}/>
<Stat icon="\u26A0" label="At-Risk" value={b50} sub="Health<50%" color={T.co}/>
<Stat icon="\u2605" label="Tier 1-2" value={q12} sub="Top performers" color={T.tl}/></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:18}}>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:16}}><SH>Performance Tier Distribution</SH>
<ResponsiveContainer width="100%" height={130}><BarChart data={qD} barSize={24}><XAxis dataKey="name" tick={{fill:T.tx,fontSize:10}} axisLine={false} tickLine={false}/><YAxis tick={{fill:T.tm,fontSize:10}} axisLine={false} tickLine={false}/><Bar dataKey="value" radius={[6,6,0,0]} label={{position:"top",fill:mode==="dark"?"#ffffff":T.tx,fontSize:11,fontWeight:700,fontFamily:"monospace"}}>{qD.map((d,i)=><Cell key={i} fill={d.fill}/>)}</Bar><Tooltip contentStyle={tip}/></BarChart></ResponsiveContainer>
<div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:4,marginTop:6}}>
{[{t:"Tier 1",d:"Elite",c:T.tl},{t:"Tier 2",d:"Strong",c:T.ic},{t:"Tier 3",d:"On Track",c:T.am},{t:"Tier 4",d:"Below",c:T.co},{t:"Tier 5",d:"Critical",c:"#d44"}].map(x=>(<div key={x.t} style={{textAlign:"center",padding:"4px 0"}}><div style={{fontSize:9,fontWeight:700,color:x.c}}>{x.t}</div><div style={{fontSize:8,color:T.tm}}>{x.d}</div></div>))}</div></div>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:16}}><SH>Pipeline Execution Matrix</SH>
{(()=>{const hf=data.filter(r=>r.fp>=100),lf=data.filter(r=>r.fp<100),hc=r=>r.cr>=20,quads=[
{label:"Executing",desc:"Building & closing",count:hf.filter(hc).length,color:T.tl},
{label:"Leaking",desc:"Not converting",count:hf.filter(r=>!hc(r)).length,color:T.am},
{label:"Running Dry",desc:"Closing but underfed",count:lf.filter(hc).length,color:T.ic},
{label:"Needs Action",desc:"Low adds & close",count:lf.filter(r=>!hc(r)).length,color:T.co}];
return(<div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:T.tm,marginBottom:4}}><span>CLOSE \u2265 20%</span><span>CLOSE &lt; 20%</span></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
{quads.map(q=>(<div key={q.label} style={{background:q.color+"12",border:`1px solid ${q.color}33`,borderRadius:10,padding:"12px 10px",textAlign:"center"}}>
<div style={{fontSize:24,fontWeight:300,color:q.color,fontFamily:"Georgia,serif"}}>{q.count}</div>
<div style={{fontSize:10,fontWeight:700,color:q.color,marginTop:2}}>{q.label}</div>
<div style={{fontSize:8,color:T.ts,marginTop:2}}>{q.desc}</div>
<div style={{fontSize:8,color:T.tm,marginTop:2}}>{data.length>0?Math.round(q.count/data.length*100):0}%</div>
</div>))}</div>
<div style={{display:"flex",justifyContent:"space-between",fontSize:8,color:T.tm,marginTop:4}}><span>\u2191 ADDS \u2265 100%</span><span>\u2193 ADDS &lt; 100%</span></div>
</div>);})()}</div>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:16}}><SH>Health Breakdown</SH>
<ResponsiveContainer width="100%" height={160}><PieChart><Pie data={[{name:"Strong 70+",value:data.filter(r=>r.fh>=70).length,fill:T.tl},{name:"Moderate",value:data.filter(r=>r.fh>=50&&r.fh<70).length,fill:T.am},{name:"At Risk",value:data.filter(r=>r.fh>=30&&r.fh<50).length,fill:T.co},{name:"Critical",value:data.filter(r=>r.fh<30).length,fill:"#d44"}]} cx="50%" cy="50%" innerRadius={38} outerRadius={62} paddingAngle={3} dataKey="value" strokeWidth={0}/><Tooltip contentStyle={tip}/><Legend wrapperStyle={{fontSize:9}}/></PieChart></ResponsiveContainer></div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
{[{title:"\u2605 Top 10 Health",reps:[...data].sort((a,b)=>b.fh-a.fh).slice(0,10)},{title:"\u26A0 Bottom 10 Health",reps:[...data].filter(r=>r.sc>0).sort((a,b)=>a.fh-b.fh).slice(0,10)}].map(s=>(
<div key={s.title} style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:14}}><SH>{s.title}</SH>
{s.reps.map((r,i)=>(<div key={r.n} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"5px 0",borderBottom:i<9?`1px solid ${T.bd}`:"none",cursor:"pointer"}} onClick={()=>{setSel(r);setTab("Rep Detail");}}>
<div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:10,color:T.tm,width:16,textAlign:"right",fontFamily:"monospace"}}>{i+1}</span><span style={{fontSize:11,fontWeight:500}}>{r.n}</span><Pill color={qC(r.qg)} bg="transparent">T{r.qg}</Pill></div>
<div style={{display:"flex",alignItems:"center",gap:6}}><span style={{fontSize:11,fontWeight:600,color:hC(r.fh),fontFamily:"monospace"}}>{r.fh.toFixed(0)}%</span><div style={{width:44}}><PB pct={r.fh} color={hC(r.fh)}/></div></div></div>))}
</div>))}</div></>)}
{tab==="Teams"&&(<div style={{display:"grid",gap:16}}>{hierarchy.map(dv=>(<div key={dv.name}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 0",borderBottom:`2px solid ${T.gl}44`,marginBottom:10}}>
<div style={{fontSize:18,fontWeight:300,fontFamily:"Georgia,serif"}}>{dv.name}</div>
<div style={{display:"flex",gap:12,fontSize:10,color:T.ts,fontFamily:"monospace"}}><span>{dv.reps.length} reps</span><span>Avg Score: <b style={{color:T.gl}}>{av(dv.reps,"sc").toFixed(0)}</b></span><span>Health: <b style={{color:hC(av(dv.reps,"fh"))}}>{av(dv.reps,"fh").toFixed(0)}%</b></span><span>Funnel: <b style={{color:fxC(av(dv.reps,r=>Math.min(r.fp,300)))}}>{av(dv.reps,r=>Math.min(r.fp,300)).toFixed(0)}%</b></span><span>Close: <b style={{color:crC(av(dv.reps,r=>Math.min(r.cr,100)))}}>{av(dv.reps,r=>Math.min(r.cr,100)).toFixed(0)}%</b></span></div></div>
<div style={{display:"grid",gap:10}}>{dv.regions.map(rg=>{const isOpen=selRg===rg.name;const aQs=av(rg.reps,r=>Math.min(r.qs,200));return(<div key={rg.name} style={{background:T.cd,border:`1px solid ${isOpen?T.gl:T.bd}`,borderRadius:14,padding:14,cursor:"pointer"}} onClick={()=>setSelRg(selRg===rg.name?null:rg.name)}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div><div style={{fontSize:14,fontWeight:isOpen?600:400,fontFamily:"Georgia,serif",color:isOpen?T.gl:T.tx}}>{rg.name}</div><div style={{display:"flex",gap:3,marginTop:4}}><Pill>{rg.reps.length} reps</Pill><Pill color={T.ic} bg={T.ic+"18"}>{rg.teams.length} teams</Pill></div></div>
<div style={{display:"flex",gap:12}}><Ring value={av(rg.reps,"sc")} max={300} color={T.gl} label="Score" size={52}/><Ring value={av(rg.reps,"fh")} max={100} color={hC(av(rg.reps,"fh"))} label="Health" size={52}/><Ring value={Math.min(av(rg.reps,r=>Math.min(r.fp,300)),200)} max={200} color={fxC(av(rg.reps,"fp"))} label="Funnel" size={52}/><Ring value={Math.min(av(rg.reps,r=>Math.min(r.cr,100)),100)} max={100} color={crC(av(rg.reps,"cr"))} label="Close" size={52}/><Ring value={Math.min(aQs,200)} max={200} color={aQs>=100?T.tl:aQs>=60?T.am:T.co} label="Quota" size={52}/></div></div>
{isOpen&&(<div style={{marginTop:14,borderTop:`1px solid ${T.bd}`,paddingTop:14}} onClick={e=>e.stopPropagation()}>
<div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:12}}>
{[{l:"Avg 5x Funnel Adds",k:"fp",mx:999,c:fxC,pd:v=>Math.min(v,200)/2},
{l:"Avg 180-Day Coverage",k:"ep",mx:999,c:v=>v>=300?T.tl:v>=60?T.am:T.co,pd:v=>Math.min(v/3,100)},
{l:"Avg Close Rate",k:"cr",mx:999,c:crC,pd:v=>Math.min(v,100)},
{l:"Avg Quota L12M",k:"qs",mx:999,c:v=>v>=100?T.tl:v>=60?T.am:T.co,pd:v=>Math.min(v/2,100)},
{l:"Avg YTD 2026",k:"yq",mx:999,c:v=>v>=100?T.tl:v>=60?T.am:T.co,pd:v=>Math.min(v,100)},
{l:"Avg TBR Results",k:"tp",mx:200,c:v=>v>=100?T.tl:v>=80?T.am:T.co,pd:v=>Math.min(v,100)}
].map(k=>{const v=av(rg.reps,r=>Math.min(r[k.k],k.mx));return(<div key={k.l} style={{background:T.bgS,borderRadius:8,padding:8,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${k.c(v)}66,transparent)`}}/><div style={{fontSize:8,color:T.tm,fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:4,fontFamily:"monospace"}}>{k.l}</div><div style={{fontSize:18,fontWeight:300,color:k.c(v),fontFamily:"Georgia,serif"}}>{v.toFixed(0)}%</div><div style={{marginTop:4}}><PB pct={k.pd(v)} color={k.c(v)}/></div></div>);})}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
<div style={{background:T.bgS,borderRadius:10,padding:10}}>
<SH>Region Risk Profile</SH>
{(()=>{const avgRisk=av(rg.reps,"risk");const cats=rg.reps.reduce((o,r)=>{const tj=r.risk>=50?"At-Risk":r.fh>=70&&r.nf>=80?"Accelerating":r.fh<50?"Declining":"Stable";o[tj]=(o[tj]||0)+1;return o;},{});return(<div>
<div style={{fontSize:24,fontWeight:300,fontFamily:"Georgia,serif",color:riskC(avgRisk)}}>{avgRisk.toFixed(0)}%</div>
<div style={{fontSize:10,color:T.ts,marginBottom:8}}>Avg Region Risk</div>
{[{l:"At-Risk",c:T.co},{l:"Accelerating",c:T.tl},{l:"Declining",c:T.am},{l:"Stable",c:T.ic}].map(x=>(<div key={x.l} style={{display:"flex",justifyContent:"space-between",padding:"3px 0",borderBottom:`1px solid ${T.bd}`,fontSize:10}}><span style={{color:x.c,fontWeight:600}}>{x.l}</span><span style={{fontFamily:"monospace",color:T.tx}}>{cats[x.l]||0}</span></div>))}
</div>);})()}</div>
<div style={{background:T.bgS,borderRadius:10,padding:10}}>
<SH>Region Forward Projections</SH>
{(()=>{const a90=av(rg.reps,"nf"),a120=av(rg.reps,"nf120"),a180=av(rg.reps,"nf180"),aDcov=av(rg.reps,"dcov");return(<div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
{[{l:"90D",v:a90},{l:"120D",v:a120},{l:"180D",v:a180}].map(p=>(<div key={p.l} style={{textAlign:"center",padding:4,background:T.bg,borderRadius:6}}><div style={{fontSize:8,color:T.tm,fontWeight:700}}>{p.l}</div><div style={{fontSize:16,fontWeight:300,color:p.v>=100?T.tl:p.v>=50?T.am:T.co,fontFamily:"Georgia,serif"}}>{Math.min(p.v,999).toFixed(0)}%</div></div>))}</div>
<div style={{fontSize:10,color:T.ts,marginTop:8}}>Avg Pipeline Coverage: <b style={{color:T.tx}}>{aDcov.toFixed(0)}d</b></div>
</div>);})()}</div>
<div style={{background:T.bgS,borderRadius:10,padding:10}}>
<SH>Region Scorecard Breakdown</SH>
{(()=>{const bd=[{name:"Funnel",s:Math.round(av(rg.reps,"fs"))},{name:"180D",s:Math.round(av(rg.reps,"es"))},{name:"L12M",s:Math.round(Math.min(av(rg.reps,"ls"),250))},{name:"Acts",s:Math.round(Math.min(av(rg.reps,"as2"),30))},{name:"TBR",s:Math.round(av(rg.reps,"ts2"))}];return(<div>
<ResponsiveContainer width="100%" height={120}><BarChart data={bd} layout="vertical" barSize={11}><XAxis type="number" tick={{fill:T.tm,fontSize:9}} axisLine={false}/><YAxis dataKey="name" type="category" tick={{fill:T.ts,fontSize:9}} axisLine={false} width={40}/><Bar dataKey="s" radius={[0,5,5,0]}>{[T.gl,T.ic,T.tl,T.pl,T.am].map((c,i)=><Cell key={i} fill={c}/>)}</Bar><Tooltip contentStyle={tip}/></BarChart></ResponsiveContainer>
<div style={{fontSize:10,color:T.ts,textAlign:"right",fontFamily:"monospace"}}>Avg Total: <span style={{color:T.gl,fontSize:14,fontFamily:"Georgia,serif"}}>{av(rg.reps,"sc").toFixed(0)}</span></div>
</div>);})()}</div></div>
<div style={{marginTop:12}}><SH>Teams in {rg.name}</SH>
{rg.teams.map(tm=>{const tmOpen=selTm===tm.name;return(<div key={tm.name} style={{background:T.bg,border:`1px solid ${tmOpen?T.gl:T.bd}`,borderRadius:10,padding:10,marginBottom:8,cursor:"pointer"}} onClick={e=>{e.stopPropagation();setSelTm(selTm===tm.name?null:tm.name);}}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div><span style={{fontSize:12,fontWeight:tmOpen?700:600,color:tmOpen?T.gl:T.tx}}>{tm.name}</span><span style={{fontSize:10,color:T.tm,marginLeft:8}}>{tm.reps.length} reps</span></div>
<div style={{display:"flex",gap:8}}><Ring value={av(tm.reps,"sc")} max={300} color={T.gl} label="Score" size={44}/><Ring value={av(tm.reps,"fh")} max={100} color={hC(av(tm.reps,"fh"))} label="Health" size={44}/><Ring value={Math.min(av(tm.reps,r=>Math.min(r.fp,300)),200)} max={200} color={fxC(av(tm.reps,"fp"))} label="Funnel" size={44}/><Ring value={Math.min(av(tm.reps,r=>Math.min(r.cr,100)),100)} max={100} color={crC(av(tm.reps,"cr"))} label="Close" size={44}/></div></div>
{tmOpen&&(<div style={{marginTop:10,borderTop:`1px solid ${T.bd}`,paddingTop:10}} onClick={e=>e.stopPropagation()}>
<div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:6,marginBottom:10}}>
{[{l:"Avg 5x Funnel Adds",k:"fp",mx:999,c:fxC,pd:v=>Math.min(v,200)/2},
{l:"Avg 180-Day Coverage",k:"ep",mx:999,c:v=>v>=300?T.tl:v>=60?T.am:T.co,pd:v=>Math.min(v/3,100)},
{l:"Avg Close Rate",k:"cr",mx:999,c:crC,pd:v=>Math.min(v,100)},
{l:"Avg Quota L12M",k:"qs",mx:999,c:v=>v>=100?T.tl:v>=60?T.am:T.co,pd:v=>Math.min(v/2,100)},
{l:"Avg YTD 2026",k:"yq",mx:999,c:v=>v>=100?T.tl:v>=60?T.am:T.co,pd:v=>Math.min(v,100)},
{l:"Avg TBR Results",k:"tp",mx:200,c:v=>v>=100?T.tl:v>=80?T.am:T.co,pd:v=>Math.min(v,100)}
].map(k=>{const v=av(tm.reps,r=>Math.min(r[k.k],k.mx));return(<div key={k.l} style={{background:T.bgS,borderRadius:8,padding:6,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${k.c(v)}66,transparent)`}}/><div style={{fontSize:7,color:T.tm,fontWeight:700,textTransform:"uppercase",letterSpacing:.6,marginBottom:3,fontFamily:"monospace"}}>{k.l}</div><div style={{fontSize:16,fontWeight:300,color:k.c(v),fontFamily:"Georgia,serif"}}>{v.toFixed(0)}%</div><div style={{marginTop:3}}><PB pct={k.pd(v)} color={k.c(v)}/></div></div>);})}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
<div style={{background:T.bgS,borderRadius:8,padding:8}}>
<SH>Team Risk Profile</SH>
{(()=>{const avgRisk=av(tm.reps,"risk");const cats=tm.reps.reduce((o,r)=>{const tj=r.risk>=50?"At-Risk":r.fh>=70&&r.nf>=80?"Accelerating":r.fh<50?"Declining":"Stable";o[tj]=(o[tj]||0)+1;return o;},{});return(<div>
<div style={{fontSize:20,fontWeight:300,fontFamily:"Georgia,serif",color:riskC(avgRisk)}}>{avgRisk.toFixed(0)}%</div>
<div style={{fontSize:9,color:T.ts,marginBottom:6}}>Avg Team Risk</div>
{[{l:"At-Risk",c:T.co},{l:"Accelerating",c:T.tl},{l:"Declining",c:T.am},{l:"Stable",c:T.ic}].map(x=>(<div key={x.l} style={{display:"flex",justifyContent:"space-between",padding:"2px 0",borderBottom:`1px solid ${T.bd}`,fontSize:9}}><span style={{color:x.c,fontWeight:600}}>{x.l}</span><span style={{fontFamily:"monospace",color:T.tx}}>{cats[x.l]||0}</span></div>))}
</div>);})()}</div>
<div style={{background:T.bgS,borderRadius:8,padding:8}}>
<SH>Team Forward Projections</SH>
{(()=>{const a90=av(tm.reps,"nf"),a120=av(tm.reps,"nf120"),a180=av(tm.reps,"nf180"),aDcov=av(tm.reps,"dcov");return(<div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:4}}>
{[{l:"90D",v:a90},{l:"120D",v:a120},{l:"180D",v:a180}].map(p=>(<div key={p.l} style={{textAlign:"center",padding:3,background:T.bg,borderRadius:6}}><div style={{fontSize:7,color:T.tm,fontWeight:700}}>{p.l}</div><div style={{fontSize:14,fontWeight:300,color:p.v>=100?T.tl:p.v>=50?T.am:T.co,fontFamily:"Georgia,serif"}}>{Math.min(p.v,999).toFixed(0)}%</div></div>))}</div>
<div style={{fontSize:9,color:T.ts,marginTop:6}}>Avg Coverage: <b style={{color:T.tx}}>{aDcov.toFixed(0)}d</b></div>
</div>);})()}</div>
<div style={{background:T.bgS,borderRadius:8,padding:8}}>
<SH>Team Scorecard</SH>
{(()=>{const bd=[{name:"Funnel",s:Math.round(av(tm.reps,"fs"))},{name:"180D",s:Math.round(av(tm.reps,"es"))},{name:"L12M",s:Math.round(Math.min(av(tm.reps,"ls"),250))},{name:"Acts",s:Math.round(Math.min(av(tm.reps,"as2"),30))},{name:"TBR",s:Math.round(av(tm.reps,"ts2"))}];return(<div>
<ResponsiveContainer width="100%" height={100}><BarChart data={bd} layout="vertical" barSize={9}><XAxis type="number" tick={{fill:T.tm,fontSize:8}} axisLine={false}/><YAxis dataKey="name" type="category" tick={{fill:T.ts,fontSize:8}} axisLine={false} width={36}/><Bar dataKey="s" radius={[0,5,5,0]}>{[T.gl,T.ic,T.tl,T.pl,T.am].map((c,i)=><Cell key={i} fill={c}/>)}</Bar><Tooltip contentStyle={tip}/></BarChart></ResponsiveContainer>
<div style={{fontSize:9,color:T.ts,textAlign:"right",fontFamily:"monospace"}}>Avg Total: <span style={{color:T.gl,fontSize:12,fontFamily:"Georgia,serif"}}>{av(tm.reps,"sc").toFixed(0)}</span></div>
</div>);})()}</div></div>
<div style={{marginTop:8}}><SH>Rep Roster</SH>
<div style={{display:"flex",flexWrap:"wrap",gap:4}}>{[...tm.reps].sort((a,b)=>b.fh-a.fh).map(r=>(<div key={r.n} onClick={e=>{e.stopPropagation();setSel(r);setTab("Rep Detail");}} style={{background:T.bgS,borderRadius:6,padding:"4px 9px",fontSize:10,cursor:"pointer",border:`1px solid ${T.bd}`,display:"flex",alignItems:"center",gap:4}} onMouseOver={e=>e.currentTarget.style.borderColor=T.gl} onMouseOut={e=>e.currentTarget.style.borderColor=T.bd}><span style={{width:6,height:6,borderRadius:"50%",background:hC(r.fh)}}/><span style={{fontWeight:500}}>{r.n.split(" ")[0]} {r.n.split(" ").slice(-1)[0][0]}.</span><span style={{color:T.tm,fontFamily:"monospace"}}>{r.fh.toFixed(0)}%</span></div>))}</div></div>
</div>)}
</div>);})}</div>
</div>)}
</div>);})}</div>
</div>))}</div>)}
{tab==="Rep Detail"&&(<div style={{display:"grid",gap:10}}>
{[...data].sort((a,b)=>b.sc-a.sc).map(r=>{const isOpen=sel&&sel.n===r.n;return(<div key={r.n} style={{background:T.cd,border:`1px solid ${isOpen?T.gl:T.bd}`,borderRadius:14,padding:14,cursor:"pointer"}} onClick={()=>setSel(isOpen?null:r)}>
<div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
<div><div style={{fontSize:14,fontWeight:isOpen?600:400,fontFamily:"Georgia,serif",color:isOpen?T.gl:T.tx}}>{r.n}</div>
<div style={{display:"flex",gap:3,marginTop:4}}><Pill color={T.gl} bg={T.gD}>{r.tm}</Pill><Pill>{r.t}</Pill>{r.h==="Hunter"&&<Pill color={T.pl} bg={T.pD}>Hunter</Pill>}<Pill color={qC(r.qg)} bg={qC(r.qg)+"18"}>T{r.qg}</Pill></div></div>
<div style={{display:"flex",gap:12}}><Ring value={r.sc} max={300} color={T.gl} label="Score" size={52}/><Ring value={r.fh} max={100} color={hC(r.fh)} label="Health" size={52}/><Ring value={Math.min(r.fp,200)} max={200} color={fxC(r.fp)} label="Funnel" size={52}/><Ring value={Math.min(r.cr,100)} max={100} color={crC(r.cr)} label="Close" size={52}/><Ring value={Math.min(r.qs,200)} max={200} color={r.qs>=100?T.tl:r.qs>=60?T.am:T.co} label="Quota" size={52}/></div></div>
{isOpen&&(<div style={{marginTop:14,borderTop:`1px solid ${T.bd}`,paddingTop:14}} onClick={e=>e.stopPropagation()}>
<div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:12}}>
{[{l:"5x Funnel Adds",v:`${Math.min(r.fp,999).toFixed(0)}%`,c:fxC(r.fp),p:Math.min(r.fp,200)/2},
{l:"180-Day Coverage",v:`${Math.min(r.ep,999).toFixed(0)}%`,c:r.ep>=300?T.tl:r.ep>=60?T.am:T.co,p:Math.min(r.ep/3,100)},
{l:"Close Rate",v:`${Math.min(r.cr,999).toFixed(0)}%`,c:crC(r.cr),p:Math.min(r.cr,100)},
{l:"Quota L12M",v:`${Math.min(r.qs,999).toFixed(0)}%`,c:r.qs>=100?T.tl:r.qs>=60?T.am:T.co,p:Math.min(r.qs/2,100)},
{l:"YTD 2026",v:`${Math.min(r.yq,999).toFixed(0)}%`,c:r.yq>=100?T.tl:r.yq>=60?T.am:T.co,p:Math.min(r.yq,100)},
{l:"TBR Results",v:`${Math.min(r.tp,200).toFixed(0)}%`,c:r.tp>=100?T.tl:r.tp>=80?T.am:T.co,p:Math.min(r.tp,100)}
].map(k=>(<div key={k.l} style={{background:T.bgS,borderRadius:8,padding:8,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,${k.c}66,transparent)`}}/><div style={{fontSize:8,color:T.tm,fontWeight:700,textTransform:"uppercase",letterSpacing:.8,marginBottom:4,fontFamily:"monospace"}}>{k.l}</div><div style={{fontSize:18,fontWeight:300,color:k.c,fontFamily:"Georgia,serif"}}>{k.v}</div><div style={{marginTop:4}}><PB pct={k.p} color={k.c}/></div></div>))}</div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
<div style={{background:T.bgS,borderRadius:10,padding:10}}>
<SH>Behavior Score</SH>
<div style={{display:"flex",gap:4}}>{["Low","Medium","High"].map(lv=>{const a=gB(r.n)===lv,cl=lv==="High"?T.tl:lv==="Medium"?T.am:T.co;return(<button key={lv} onClick={()=>sB(r.n,lv)} style={{flex:1,padding:"6px 0",borderRadius:6,fontSize:10,fontWeight:600,cursor:"pointer",border:a?`2px solid ${cl}`:`1px solid ${T.bd}`,background:a?cl+"18":T.bg,color:a?cl:T.tm,fontFamily:"inherit"}}>{lv} +{bW(lv)}</button>);})}</div>
<div style={{marginTop:8,fontSize:10,color:T.ts}}>Composite: <span style={{fontSize:18,fontWeight:300,fontFamily:"Georgia,serif",color:T.tx}}>{(r.fh+bW(gB(r.n))).toFixed(1)}</span></div></div>
<div style={{background:T.bgS,borderRadius:10,padding:10}}>
<SH>Forward Projections</SH>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
{[{l:"90D",v:r.nf},{l:"120D",v:r.nf120},{l:"180D",v:r.nf180}].map(p=>(<div key={p.l} style={{textAlign:"center",padding:4,background:T.bg,borderRadius:6}}><div style={{fontSize:8,color:T.tm,fontWeight:700}}>{p.l}</div><div style={{fontSize:16,fontWeight:300,color:p.v>=100?T.tl:p.v>=50?T.am:T.co,fontFamily:"Georgia,serif"}}>{Math.min(p.v,999).toFixed(0)}%</div></div>))}</div>
<div style={{display:"flex",justifyContent:"space-between",marginTop:6,fontSize:10}}><span>Risk: <span style={{color:riskC(r.risk),fontWeight:700}}>{r.risk}%</span></span><span>Coverage: <b>{r.dcov}d</b></span></div></div>
<div style={{background:T.bgS,borderRadius:10,padding:10}}>
<SH>Scorecard Breakdown</SH>
<ResponsiveContainer width="100%" height={120}><BarChart data={[{name:"Funnel",s:r.fs},{name:"180D",s:r.es},{name:"L12M",s:Math.min(r.ls,250)},{name:"Acts",s:Math.min(r.as2,30)},{name:"TBR",s:r.ts2}]} layout="vertical" barSize={11}><XAxis type="number" tick={{fill:T.tm,fontSize:9}} axisLine={false}/><YAxis dataKey="name" type="category" tick={{fill:T.ts,fontSize:9}} axisLine={false} width={40}/><Bar dataKey="s" radius={[0,5,5,0]}>{[T.gl,T.ic,T.tl,T.pl,T.am].map((c,i)=><Cell key={i} fill={c}/>)}</Bar><Tooltip contentStyle={tip}/></BarChart></ResponsiveContainer>
<div style={{fontSize:10,color:T.ts,textAlign:"right",fontFamily:"monospace"}}>Total: <span style={{color:T.gl,fontSize:14,fontFamily:"Georgia,serif"}}>{r.sc.toFixed(0)}</span></div></div>
</div></div>)}
</div>);})}</div>)}
{tab==="Predictive Analytics"&&(()=>{
const pd=data.filter(r=>r.sc>0).map(r=>({...r,tj:r.risk>=50?"At-Risk":r.fh>=70&&r.nf>=80?"Accelerating":r.fh<50?"Declining":"Stable"}));
const groups={};pd.forEach(r=>{if(!groups[r.tj])groups[r.tj]=[];groups[r.tj].push(r);});
const aN=(k)=>(pd.reduce((s,r)=>s+r[k],0)/pd.length).toFixed(0);
const fd=pFi==="All"?pd:pd.filter(r=>r.tj===pFi);
const so=[...fd].sort((a,b)=>pSo==="risk"?b.risk-a.risk:pSo==="nf"?b.nf-a.nf:pSo==="fh"?b.fh-a.fh:b.sc-a.sc);
return(<>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:16,marginBottom:14}}>
<div style={{fontSize:15,fontWeight:300,fontFamily:"Georgia,serif",color:T.gl,marginBottom:3}}>Predictive Close & Funnel Analytics</div>
<div style={{fontSize:10,color:T.ts,marginBottom:14}}>Forward projections from pipeline and close rate data. {pd.length} active reps.</div>
<div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10}}>
{[{l:"90-Day Org",v:aN("nf")},{l:"120-Day Org",v:aN("nf120")},{l:"180-Day Org",v:aN("nf180")}].map(h=><Stat key={h.l} icon="\u25CB" label={h.l} value={`${h.v}%`} color={Number(h.v)>=100?T.tl:Number(h.v)>=50?T.am:T.co} sub="Avg forecast"/>)}
{[{l:"At-Risk",cl:T.co,ic:"\u26A0"},{l:"Accelerating",cl:T.tl,ic:"\u2605"},{l:"Declining",cl:T.am,ic:"\u25BC"},{l:"Stable",cl:T.ic,ic:"\u25B6"}].map(g=>(<div key={g.l} onClick={()=>setPFi(pFi===g.l?"All":g.l)} style={{cursor:"pointer",outline:pFi===g.l?`2px solid ${g.cl}`:"none",borderRadius:14}}><Stat icon={g.ic} label={g.l} value={(groups[g.l]||[]).length} color={g.cl} sub={`${((groups[g.l]||[]).length/pd.length*100).toFixed(0)}%`}/></div>))}</div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:16}}><SH>Health vs 90-Day Forecast</SH>
<ResponsiveContainer width="100%" height={190}><ScatterChart><CartesianGrid strokeDasharray="3 3" stroke={T.bd}/><XAxis dataKey="x" tick={{fill:T.tm,fontSize:9}} axisLine={false} domain={[0,100]}/><YAxis dataKey="y" tick={{fill:T.tm,fontSize:9}} axisLine={false} domain={[0,200]}/><Tooltip contentStyle={tip}/><Scatter data={pd.map(r=>({x:r.fh,y:Math.min(r.nf,200),n:r.n,t:r.tj}))} fill={T.gl}>{pd.map((r,i)=><Cell key={i} fill={r.tj==="At-Risk"?T.co:r.tj==="Accelerating"?T.tl:r.tj==="Declining"?T.am:T.ic}/>)}</Scatter></ScatterChart></ResponsiveContainer></div>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:16}}><SH>Forecast Horizon Comparison</SH>
<ResponsiveContainer width="100%" height={190}><BarChart data={[{name:"90-Day",v:Number(aN("nf"))},{name:"120-Day",v:Number(aN("nf120"))},{name:"180-Day",v:Number(aN("nf180"))}]} barSize={36}><XAxis dataKey="name" tick={{fill:T.tm,fontSize:11}} axisLine={false} tickLine={false}/><YAxis tick={{fill:T.tm,fontSize:10}} axisLine={false} tickLine={false}/><Bar dataKey="v" radius={[8,8,0,0]}>{[T.tl,T.ic,T.gl].map((c,i)=><Cell key={i} fill={c}/>)}</Bar><Tooltip contentStyle={tip}/></BarChart></ResponsiveContainer></div></div>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:14}}>
<div style={{display:"flex",gap:3,marginBottom:3}}>{["All","At-Risk","Accelerating","Declining","Stable"].map(f=>(<button key={f} onClick={()=>setPFi(f)} style={{background:pFi===f?T.gl:"transparent",color:pFi===f?T.bg:T.tm,border:"none",borderRadius:6,padding:"3px 10px",fontSize:9,fontWeight:700,cursor:"pointer",fontFamily:"monospace"}}>{f}</button>))}</div>
<div style={{display:"flex",gap:3,marginBottom:10}}>{[{l:"Risk",k:"risk"},{l:"90D",k:"nf"},{l:"Health",k:"fh"},{l:"Score",k:"sc"}].map(s=>(<button key={s.k} onClick={()=>setPSo(s.k)} style={{background:pSo===s.k?T.bgS:"transparent",color:pSo===s.k?T.tx:T.tm,border:`1px solid ${pSo===s.k?T.bd:"transparent"}`,borderRadius:5,padding:"2px 8px",fontSize:9,fontWeight:600,cursor:"pointer",fontFamily:"monospace"}}>Sort: {s.l}</button>))}</div>
<div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:11}}>
<thead><tr style={{background:T.bgS}}>{["Rep","Team","Health","90D","120D","180D","Close%","Risk","Cov","Trajectory",""].map(h=>(<th key={h} style={{padding:"7px 9px",textAlign:"left",color:T.tm,fontWeight:700,fontSize:8,textTransform:"uppercase",letterSpacing:1.2,borderBottom:`1px solid ${T.bd}`,whiteSpace:"nowrap",fontFamily:"monospace"}}>{h}</th>))}</tr></thead>
<tbody>{so.slice(0,50).map(r=>{const tc=r.tj==="At-Risk"?T.co:r.tj==="Accelerating"?T.tl:r.tj==="Declining"?T.am:T.ic;return(<tr key={r.n} style={{borderBottom:`1px solid ${T.bd}`,cursor:"pointer"}} onClick={()=>{setSel(r);setTab("Rep Detail");}} onMouseOver={e=>e.currentTarget.style.background=T.cH} onMouseOut={e=>e.currentTarget.style.background="transparent"}>
<td style={{padding:"7px 9px",fontWeight:500,maxWidth:140,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.n}</td>
<td style={{padding:"7px 9px",color:T.tm,fontSize:10,maxWidth:100,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.tm}</td>
<td style={{padding:"7px 9px"}}><span style={{color:hC(r.fh),fontWeight:600,fontFamily:"monospace"}}>{r.fh.toFixed(0)}%</span></td>
<td style={{padding:"7px 9px",color:r.nf>=100?T.tl:r.nf>=50?T.am:T.co,fontFamily:"monospace"}}>{Math.min(r.nf,999).toFixed(0)}%</td>
<td style={{padding:"7px 9px",color:r.nf120>=100?T.tl:r.nf120>=50?T.am:T.co,fontFamily:"monospace"}}>{Math.min(r.nf120,999).toFixed(0)}%</td>
<td style={{padding:"7px 9px",color:r.nf180>=100?T.tl:r.nf180>=50?T.am:T.co,fontFamily:"monospace"}}>{Math.min(r.nf180,999).toFixed(0)}%</td>
<td style={{padding:"7px 9px",color:crC(r.cr),fontFamily:"monospace"}}>{Math.min(r.cr,999).toFixed(0)}%</td>
<td style={{padding:"7px 9px"}}><span style={{color:riskC(r.risk),fontWeight:600,fontFamily:"monospace"}}>{r.risk}%</span></td>
<td style={{padding:"7px 9px",fontFamily:"monospace"}}>{r.dcov}d</td>
<td style={{padding:"7px 9px"}}><Pill color={tc} bg={tc+"18"}>{r.tj}</Pill></td>
<td style={{padding:"7px 9px"}}><span style={{color:T.gl,fontSize:10,fontWeight:600}}>View\u2192</span></td>
</tr>);})}</tbody></table></div>
{so.length>50&&<div style={{textAlign:"center",padding:6,fontSize:10,color:T.tm}}>Showing 50/{so.length}</div>}
</div></>);})()}
{tab==="Methodology"&&(<>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:16,marginBottom:12}}>
<div style={{fontSize:15,fontWeight:300,fontFamily:"Georgia,serif",color:T.gl,marginBottom:2}}>Scoring Methodology Reference</div>
<div style={{fontSize:10,color:T.ts}}>Complete metric definitions, formulas, thresholds, and classification rules. Data as of 03/05/2026.</div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:14}}>
<SH>Scorecard Components (Total Score)</SH>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}><tbody>
{[["Funnel Adds Score","Max 75","30d new pipeline \u00F7 (5 \u00D7 monthly quota) \u00D7 15. Capped at 300%.",T.gl],
["180-Day Pipeline Score","Max 75","180d pipeline \u00F7 (6 \u00D7 monthly quota) \u00D7 15. Coverage depth.",T.ic],
["L12M Net Sales Score","Max 250","L12M net sales \u00F7 (12 \u00D7 monthly quota) \u00D7 0.4. Heaviest weight \u2014 proven revenue.",T.tl],
["Activities Score","Max 30","CRM activities YTD \u00F7 target \u00D7 0.1. Engagement discipline.",T.pl],
["TBR Results Score","Max ~47","% of 2025 TBR target \u00D7 0.2. Plan execution.",T.am]
].map(r=>(<tr key={r[0]} style={{borderBottom:`1px solid ${T.bd}`}}><td style={{padding:"6px 4px",fontWeight:600,color:r[3],whiteSpace:"nowrap"}}>{r[0]}</td><td style={{padding:"6px 4px",color:T.tm,fontFamily:"monospace",whiteSpace:"nowrap"}}>{r[1]}</td><td style={{padding:"6px 4px",color:T.ts}}>{r[2]}</td></tr>))}
</tbody></table></div>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:14}}>
<SH>Derived Analytics (Calculated)</SH>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}><tbody>
{[["Close Rate","(L12M revenue annualized) \u00F7 (180d pipeline \u00D7 2) \u00D7 100. Conversion efficiency.",T.tl],
["Funnel Health","0-100 composite: 25pts each from Funnel Adds (vs 100%), 180d Coverage (vs 300%), Close Rate (vs 20%), Quota (vs 100%). Each caps at 1.5\u00D7.",T.tl],
["90-Day Forecast","50% of 180d pipeline \u00D7 close rate \u00F7 3mo quota. Next-quarter coverage.",T.tl],
["120-Day Forecast","67% of 180d pipeline \u00D7 close rate \u00F7 4mo quota. Extended horizon.",T.ic],
["180-Day Forecast","100% of 180d pipeline \u00D7 close rate \u00F7 6mo quota. Full half-year.",T.gl],
["Coverage Days","(180d pipeline \u00D7 close rate) \u00F7 daily quota. Days before pipeline exhausted.",T.am],
["Composite","Funnel Health + Behavior (+1/+3/+5). Quantitative + qualitative.",T.pl]
].map(r=>(<tr key={r[0]} style={{borderBottom:`1px solid ${T.bd}`}}><td style={{padding:"6px 4px",fontWeight:600,color:r[2],whiteSpace:"nowrap"}}>{r[0]}</td><td style={{padding:"6px 4px",color:T.ts}}>{r[1]}</td></tr>))}
</tbody></table></div></div>
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:14}}>
<SH>\u26A0 Risk Score (0-100)</SH>
<div style={{fontSize:10,color:T.ts,marginBottom:6}}>Additive multi-factor model. Each fires independently.</div>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}><tbody>
{[["Health < 50%","+30",T.co],["Health 50-69%","+15",T.am],["Funnel Adds < 50%","+20",T.co],["Funnel Adds 50-99%","+10",T.am],
["Close Rate < 10%","+20",T.co],["Close Rate 10-19%","+10",T.am],["L12M Quota < 60%","+20",T.co],["L12M Quota 60-99%","+10",T.am],["YTD < 50%","+10",T.co]
].map(r=>(<tr key={r[0]} style={{borderBottom:`1px solid ${T.bd}`}}><td style={{padding:"4px",color:T.ts}}>{r[0]}</td><td style={{padding:"4px",fontWeight:700,color:r[2],fontFamily:"monospace",textAlign:"right"}}>{r[1]}</td></tr>))}
</tbody></table>
<div style={{marginTop:6,fontSize:9,color:T.tm}}>0-20 Low \u00B7 21-49 Moderate \u00B7 50+ High (At-Risk)</div></div>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:14}}>
<SH>Trajectory & Tiers</SH>
<div style={{fontSize:9,fontWeight:700,color:T.tm,marginBottom:4}}>TRAJECTORY (cascading rules)</div>
{[["At-Risk","Risk \u2265 50%. Multi-factor critical.",T.co],["Accelerating","Health \u2265 70 AND 90D \u2265 80%.",T.tl],
["Declining","Health < 50, Risk < 50. Early warning.",T.am],["Stable","None of above. Monitor.",T.ic]
].map(r=>(<div key={r[0]} style={{padding:"4px 0",borderBottom:`1px solid ${T.bd}`,fontSize:10}}><span style={{fontWeight:700,color:r[2]}}>{r[0]}</span><span style={{color:T.ts,marginLeft:6}}>{r[1]}</span></div>))}
<div style={{fontSize:9,fontWeight:700,color:T.tm,marginTop:10,marginBottom:4}}>PERFORMANCE TIERS</div>
{[["T1 Elite","Top 20% by score",T.tl],["T2 Strong","60-80th pctl",T.ic],["T3 On Track","40-60th pctl",T.am],
["T4 Below","20-40th pctl",T.co],["T5 Critical","Bottom 20%","#d44"]
].map(r=>(<div key={r[0]} style={{padding:"3px 0",fontSize:10}}><span style={{fontWeight:700,color:r[2]}}>{r[0]}</span><span style={{color:T.ts,marginLeft:6}}>{r[1]}</span></div>))}</div>
<div style={{background:T.cd,border:`1px solid ${T.bd}`,borderRadius:14,padding:14}}>
<SH>Thresholds & Matrix</SH>
<table style={{width:"100%",borderCollapse:"collapse",fontSize:10}}><thead><tr><th style={{textAlign:"left",padding:"3px",color:T.tm,fontSize:9}}>Metric</th><th style={{padding:"3px",color:T.tl,fontSize:9}}>Good</th><th style={{padding:"3px",color:T.am,fontSize:9}}>Warn</th><th style={{padding:"3px",color:T.co,fontSize:9}}>Bad</th></tr></thead><tbody>
{[["Funnel Adds","\u2265100%","50-99%","<50%"],["180d Coverage","\u2265300%","60-299%","<60%"],["Close Rate","\u226520%","10-19%","<10%"],
["Quota L12M","\u2265100%","60-99%","<60%"],["TBR","\u2265100%","80-99%","<80%"]
].map(r=>(<tr key={r[0]} style={{borderBottom:`1px solid ${T.bd}`}}><td style={{padding:"3px",color:T.ts}}>{r[0]}</td><td style={{padding:"3px",textAlign:"center",color:T.tl}}>{r[1]}</td><td style={{padding:"3px",textAlign:"center",color:T.am}}>{r[2]}</td><td style={{padding:"3px",textAlign:"center",color:T.co}}>{r[3]}</td></tr>))}
</tbody></table>
<div style={{fontSize:9,fontWeight:700,color:T.tm,marginTop:10,marginBottom:4}}>PIPELINE MATRIX</div>
{[["Executing","Adds\u2265100% + Close\u226520%",T.tl],["Leaking","Adds\u2265100% + Close<20%",T.am],
["Running Dry","Adds<100% + Close\u226520%",T.ic],["Needs Action","Both below threshold",T.co]
].map(r=>(<div key={r[0]} style={{padding:"3px 0",fontSize:10}}><span style={{fontWeight:700,color:r[2]}}>{r[0]}</span><span style={{color:T.ts,marginLeft:6}}>{r[1]}</span></div>))}</div>
</div></>)}
</div></div>);
}
