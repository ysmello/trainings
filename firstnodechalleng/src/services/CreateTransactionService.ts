import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const allTransactions = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();

    if (
      (type === 'outcome' && !allTransactions.length) ||
      (type === 'outcome' && balance.total < value)
    ) {
      throw Error('O valor retirado é maior q o obtido');
    }

    const transactionRepository = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transactionRepository;
  }
}

export default CreateTransactionService;
