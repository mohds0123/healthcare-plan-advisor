def predict_cost(age, income, smoker, family_size, has_disease):

    base = age * 120

    if smoker:
        base += 4000

    if has_disease:
        base += 6000

    base += family_size * 900
    base += income * 0.01

    return base
