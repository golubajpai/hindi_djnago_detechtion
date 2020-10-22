#!/usr/bin/env python3
# -*- coding: utf-8 -*-


class ConvertImageAndKNN:
    def __init__(self):
        self.glob_list=[]
    def image_resizing():
        pass
    
    def load_dataSet(self):
        b=[x for x in glob.glob('/Users/apple/Downloads/DevanagariHandwrittenCharacterDataset/Train/*')]
        #import pdb;pdb.set_trace()
        j=0
        fin={}
        final_data=[]
        final_value=[]
        
        
        while j<len(b):
            y=glob.glob(b[j]+'/*')
            fin[j]=b[j].split('/')[-1]
            k=0
            new=[]
            val=[]
            while k<len(y):
                data=cv2.imread(y[k],0)
                new.append(data)
                val.append(j)
                k=k+1
            final_data.extend(new)
            final_value.extend(val)
            j=j+1
        
        test=final_data[0:1700:60]
        label=final_value[0:1700:60]
        self.glob_list=[final_data,final_value,test,label,fin]
        #import pdb;pdb.set_trace()
        return self.glob_list
    
   
#a= ConvertImageAndKNN()
#c=a.load_dataSet()
#print('______data _______loaded')

def trained_model():



    train_data= np.array(c[0])/255
    train_data=train_data[:,:,:,newaxis]
    train_lalel1=np.array(c[1])
    train_lalel=keras.utils.to_categorical(train_lalel1,num_classes=len(c[-1].keys()))

    #import pdb;pdb.set_trace()
    model=Sequential()
    print('sequetial')
    #import pdb;pdb.set_trace()
    model.add(Conv2D(32,kernel_size=(3,3),activation='relu',input_shape=(32,32,1)))
    model.add(Conv2D(64,kernel_size=(3,3),activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))
    model.add(Conv2D(32,kernel_size=(3,3),activation='relu'))
    model.add(Conv2D(64,kernel_size=(3,3),activation='relu'))
    model.add(MaxPooling2D(pool_size=(2,2)))

    model.add(Flatten())
    print('flatten layer --------------------')
    #import pdb;pdb.set_trace()
    model.add(Dense(units=128, activation='relu'))
    print('first dence layer ------------------')
    model.add(Dense(units=46, activation='softmax'))
    print('second dence completed ----------')

    model.compile(loss=keras.losses.categorical_crossentropy,
                  optimizer=keras.optimizers.Adadelta(),
                  metrics=['accuracy'])
    print('compile model')
    train_label=np.array([c[1]])/255
    model.fit(train_data,train_lalel,batch_size=10,epochs=1,verbose=1)
    #import pdb;pdb.set_trace()
    return model




