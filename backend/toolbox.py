# -*- coding: utf-8 -*-
"""
Created on Fri Oct 16 00:36:14 2020

@author: maxim
"""

from creditagricole_particuliers import Authenticator
from creditagricole_particuliers import Operations
import pandas as pd
import datetime

# my_account_number
my_username = "" 

# password be like: [1,2,3,4,5]
my_password = [] 


def connexion(username, password, date_start, date_stop):
    session = Authenticator(username=username, password=password)
    operations = Operations(session=session, date_start=date_start, date_stop=date_stop)
    return operations.list  


# get operation list
def get_dataframe(op):
    data = op.list  
    df = pd.DataFrame(data)
    df2 = pd.DataFrame(df[["libelleOperation","montant", "dateOperation"]])
    
    df2['dateOperation'] = pd.to_datetime(df2['dateOperation'], format='%b %d, %Y %I:%M:%S %p')
    
    return df2 
    





# obtenir le solde à une date de fin donnée 
def get_solde_today(df, initSolde):   
  
    solde = initSolde + sum(df.montant)

    return round(solde, 2)
    
    
    
# obtenir le solde depuis le virement du salaire
def get_solde_depuis_le(df, initSolde, dateDebut):
      
    dernier_solde = get_solde_today(df, initSolde)   
    dateDebut = datetime.datetime.strptime(dateDebut, "%Y-%m-%d")    

    df_filter = df[df.dateOperation > dateDebut]

    solde = dernier_solde - sum(df_filter.montant)

    return solde
    










    
    
    
    
    