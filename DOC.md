## JSON Object

```js
{
    int: 9999,
    float: Math.PI,
    str: "Hello, world!",
    undef: undefined,
    nil: null,
    T: true,
    F: false,
    arr: ['A', 'B', 'C'],
    obj: {
        map: new Map([[1, 2], [3, 4]]),
        set: new Set([7, 8, 9])
    },
    date: new Date()
}
```

## Encoded Value

```text
  [  10,    10,     7,     3,   105,   110,   116,     4,   143,   156,     1,     7,  
      5,   102,   108,   111,    97,   116,     6,    64,     9,    33,   251,    84,  
     68,    45,    24,     7,     3,   115,   116,   114,     7,    13,    72,   101,  
    108,   108,   111,    44,    32,   119,   111,   114,   108,   100,    33,     7,  
      5,   117,   110,   100,   101,   102,     0,     7,     3,   110,   105,   108,  
      1,     7,     1,    84,     2,     7,     1,    70,     3,     7,     3,    97,  
    114,   114,     8,     3,     7,     1,    65,     7,     1,    66,     7,     1,  
     67,     7,     3,   111,    98,   106,    10,     2,     7,     3,   109,    97,  
    112,    11,     2,     4,     1,     4,     2,     4,     3,     4,     4,     7,  
      3,   115,   101,   116,     9,     3,     4,     7,     4,     8,     4,     9   ]
```

## Encoded Value Details

```text
10       10
OBJECT   Key/value count
    
    
    [Key#0]     7        3    105  110  116
                STRING   len  "i"  "n"  "t"
    
    [Value#0]   5        143  156  1
                INT      Value: 9999
        
    
    [Key#1]     7        5    102  108  111  97   116
                STRING   len  "f"  "l"  "o"  "a"  "t"
    
    [Value#1]   6        64  9   33  251  84  68  45  24
                FLOAT    ......Encoded value of PI......
        
    
    [Key#2]     7        3    115  116  114
                STRING   len  "s"  "t"  "r"
    
    [Value#2]   7        13   72   101  108  108  111  44   32   119  111  114  108  100  33
                STRING   len  "H"  "e"  "l"  "l"  "o"  ","  " "  "W"  "o"  "r"  "l"  "d"  "!"
        
    
    [Key#3]     7        5    117  110  100  101  102
                STRING   len  "u"  "n"  "d"  "e"  "f"
    
    [Value#3]   0
                UNDEFINED


    [Key#4]     7        3    110  105  108
                STRING   len  "n"  "i"  "l"
    
    [Value#4]   1
                NULL


    [Key#5]     7        1    84
                STRING   len  "T"
    
    [Value#5]   2
                TRUE


    [Key#6]     7        1    70
                STRING   len  "F"
    
    [Value#6]   3
                FALSE


    [Key#7]     7        3    97   114  114
                STRING   len  "a"  "r"  "r"
    
    [Value#7]   8        3
                ARRAY    len
                
                [Index#0]   7        1    65
                            STRING   len  "A"
                            
                [Index#1]   7        1    66
                            STRING   len  "B"
                            
                [Index#1]   7        1    67
                            STRING   len  "C"


    [Key#8]     7        3    111  98   106
                STRING   len  "o"  "b"  "j"
    
    [Value#8]   10       2
                OBJECT   Key/value count
                
                [Key#0]    7        3    109  97   112
                           STRING   len  "m"  "a"  "p"
                
                [Value#0]  11       2
                           MAP      len
                
                           [Key#0]    4         1
                                      INTEGER   Value: 1
                                      
                           [Value#0]  4         2
                                      INTEGER   Value: 2
                
                
                           [Key#1]    4         3
                                      INTEGER   Value: 3
                                      
                           [Value#1]  4         4
                                      INTEGER   Value: 4

                
                [Key#0]    7        3    115  101  116
                           STRING   len  "s"  "e"  "t"
                
                [Value#0]  9        3
                           SET      len
                
                           [Index#0]   4         7
                                       INTEGER   Value: 7
                
                           [Index#1]   4         8
                                       INTEGER   Value: 8
                
                           [Index#1]   4         9
                                       INTEGER   Value: 9
```
