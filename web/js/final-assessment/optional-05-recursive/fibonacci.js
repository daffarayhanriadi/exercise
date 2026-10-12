function fibonacci(n) {
  if (n === 0) {
    return [0];
  } else if (n === 1) {
    return [0, 1];
  } else {
    const fiboSequence = fibonacci(n - 1);
    const nextValue = fiboSequence[fiboSequence.length - 1] + fiboSequence[fiboSequence.length - 2];
    fiboSequence.push(nextValue);
    return fiboSequence;
  }
}

// Jangan hapus kode di bawah ini!
export default fibonacci;
