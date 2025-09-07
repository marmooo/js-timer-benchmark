# js-timer-benchmark

Benchmark the accuracy of various timers available in JavaScript.

## Result (Chrome)

- foreground 1st run

| method                | 1sec error | 2sec error |
| --------------------- | ---------: | ---------: |
| setTimeout            |      0.9ms |      0.6ms |
| setInterval (10)      |      0.8ms |      0.4ms |
| setInterval (100)     |      0.6ms |      0.4ms |
| AudioBufferSourceNode |    106.1ms |      2.2ms |
| OscillatorNode        |      6.2ms |     14.3ms |
| ConstantSourceNode    |      6.6ms |     20.2ms |
| requestAnimationFrame |      9.7ms |      8.8ms |

- foreground

| method                | 1sec error | 2sec error |
| --------------------- | ---------: | ---------: |
| setTimeout            |      0.7ms |      0.4ms |
| setInterval (10)      |      0.6ms |      0.4ms |
| setInterval (100)     |      0.4ms |      0.5ms |
| AudioBufferSourceNode |      8.6ms |      5.8ms |
| OscillatorNode        |      9.3ms |     19.1ms |
| ConstantSourceNode    |     10.1ms |     20.4ms |
| requestAnimationFrame |      1.0ms |      0.1ms |

- background 1st run

| method                | 1sec error | 2sec error |
| --------------------- | ---------: | ---------: |
| setTimeout            |    989.9ms |    900.6ms |
| setInterval (10)      |      0.5ms |    999.7ms |
| setInterval (100)     |    998.8ms |    999.5ms |
| AudioBufferSourceNode |     89.9ms |      5.8ms |
| OscillatorNode        |     10.7ms |     19.9ms |
| ConstantSourceNode    |      3.9ms |     20.2ms |
| requestAnimationFrame |  34985.8ms |  30565.4ms |

- background

| method                | 1sec error | 2sec error |
| --------------------- | ---------: | ---------: |
| setTimeout            |    998.4ms |    390.6ms |
| setInterval (10)      |   1000.2ms |      0.4ms |
| setInterval (100)     |    998.8ms |    999.1ms |
| AudioBufferSourceNode |      8.0ms |      1.3ms |
| OscillatorNode        |      9.7ms |     19.6ms |
| ConstantSourceNode    |     10.1ms |     19.5ms |
| requestAnimationFrame |  14580.2ms |   2245.5ms |

## Conclusion

### setTimeout & setInterval

Suitable for general use. Less accurate in inactive tabs (ref:
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout)).

### requestAnimationFrame

Should run in active tabs.

### AudioBufferSourceNode

It has lower accurary at initial startup than OscillatorNode and
ConstantSourceNode. However, from the second time onwards, the accuracy is
higher than theirs.

### OscillatorNode & ConstantSourceNode

Suitable for audio playback or when you need a high-precision timer in inactive
tabs. It is less accurate than setTimeout and setInterval in active tabs.

## Tips for Safari

- AudioScheduledSourceNode needs to be connected to the destionation
- AudioBufferSourceNode requires an AudioBuffer
- Web Audio API is forcibly "suspended" when entering the background
- Web Audio API cannot be resumed while in the background
- Web Audio API requires resume() when returning to the foreground

## Build

```
bash build.sh
```

## License

MIT
