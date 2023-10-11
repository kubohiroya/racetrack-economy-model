export class MultiValueMap<K, V> {
  private internalMap: Map<K, Set<V>>;

  constructor() {
    this.internalMap = new Map<K, Set<V>>();
  }

  // キーに対する値を追加する
  add(key: K, value: V): void {
    if (!this.internalMap.has(key)) {
      this.internalMap.set(key, new Set<V>());
    }
    this.internalMap.get(key)!.add(value);
  }

  // キーに対する値を取得する
  get(key: K): Set<V> | undefined {
    return this.internalMap.get(key);
  }

  // キーに対する値を削除する
  deleteValue(key: K, value: V): void {
    const values = this.internalMap.get(key);
    if (values) {
      values.delete(value);
      if (values.size === 0) {
        this.internalMap.delete(key);
      }
    }
  }

  // キーに関連するすべての値を削除する
  deleteAllValues(key: K): void {
    this.internalMap.delete(key);
  }

  // すべてのエントリをクリアする
  clear(): void {
    this.internalMap.clear();
  }

  // キーの存在確認
  has(key: K): boolean {
    return this.internalMap.has(key);
  }

  // キーと値の組み合わせでの存在確認
  hasValue(key: K, value: V): boolean {
    const values = this.internalMap.get(key);
    return values ? values.has(value) : false;
  }

  // Mapのサイズを取得する
  get size(): number {
    return this.internalMap.size;
  }
}